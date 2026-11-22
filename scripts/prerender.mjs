import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(projectRoot, "dist");
const templatePath = path.join(outputDirectory, "index.html");
const serverEntryPath = path.join(projectRoot, "dist-ssr", "entry-server.js");

const template = await readFile(templatePath, "utf8");
const { prerenderRoutes, render } = await import(pathToFileURL(serverEntryPath).href);

const injectRender = ({ appHtml, head }) => {
  const withoutTemplateTitle = template.replace(/\s*<title>[\s\S]*?<\/title>/, "");
  const withRenderedHead = withoutTemplateTitle.replace("</head>", `${head}\n  </head>`);
  return withRenderedHead.replace(
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

console.log(`Prerendered ${prerenderRoutes.length} pages and a custom 404 page.`);
