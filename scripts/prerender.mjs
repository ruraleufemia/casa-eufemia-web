import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(projectRoot, "dist");
const templatePath = path.join(outputDirectory, "index.html");
const serverEntryPath = path.join(projectRoot, "dist-ssr", "entry-server.js");

const template = await readFile(templatePath, "utf8");
const { prerenderRoutes, render, sitemapEntries } = await import(
  pathToFileURL(serverEntryPath).href
);

const injectRender = ({ appHtml, head, lang }) => {
  const withoutTemplateTitle = template.replace(/\s*<title>[\s\S]*?<\/title>/, "");
  const withRenderedHead = withoutTemplateTitle.replace("</head>", `${head}\n  </head>`);
  // El idioma del <html>: la plantilla viene con lang="es" y las páginas
  // de /en tienen que salir con lang="en", que es lo que leen Google y los
  // lectores de pantalla para saber en qué idioma está la página.
  const withLang = withRenderedHead.replace(
    /<html\s+lang="[^"]*"/,
    `<html lang="${lang ?? "es"}"`,
  );
  return withLang.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  );
};

const outputPathFor = (route) => {
  if (route === "/") return templatePath;
  return path.join(outputDirectory, `${route.replace(/^\//, "")}.html`);
};

for (const route of prerenderRoutes) {
  const outputPath = outputPathFor(route);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, injectRender(render(route)), "utf8");
}

const notFoundPath = path.join(outputDirectory, "404.html");
await writeFile(notFoundPath, injectRender(render("/404")), "utf8");

// El sitemap, con los pares de idioma, generado a partir de las mismas rutas
// que se acaban de prerenderizar. Sobrescribe el que viene de public/.
const hoy = new Date().toISOString().slice(0, 10);
const entries = sitemapEntries();
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...entries.map((entry) =>
    [
      "  <url>",
      `    <loc>${entry.loc}</loc>`,
      ...entry.alternates.map(
        (alt) =>
          `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`,
      ),
      `    <lastmod>${hoy}</lastmod>`,
      `    <priority>${entry.priority}</priority>`,
      "  </url>",
    ].join("\n"),
  ),
  "</urlset>",
  "",
].join("\n");
await writeFile(path.join(outputDirectory, "sitemap.xml"), sitemap, "utf8");

console.log(
  `Prerendered ${prerenderRoutes.length} pages, a custom 404 page and a sitemap with ${entries.length} URLs.`,
);
