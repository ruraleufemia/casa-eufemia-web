import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import type { HelmetServerState } from "react-helmet-async";
import { AppProviders, AppRoutes } from "./App";
import ScrollToTop from "./components/ScrollToTop";
import { blogPosts } from "./data/blogPosts";
import { absoluteUrl, allPaths, alternatePath, langOf } from "./lib/locales";
import i18n from "./i18n/config";
import "./index.css";

/**
 * Las direcciones que se convierten en HTML estático: las españolas y las
 * inglesas. Hasta ahora solo salían las españolas, así que Google nunca
 * llegó a ver la versión inglesa de nada.
 */
export const prerenderRoutes = allPaths(blogPosts.map((post) => post.slug));

/**
 * El sitemap se genera en el build a partir de estas mismas rutas, no a
 * mano: así no puede quedarse desfasado cuando añadimos una página, que es
 * justo lo que hace que Google no la encuentre.
 */
export const sitemapEntries = () =>
  prerenderRoutes.map((route) => {
    const other = alternatePath(route);
    const lang = langOf(route);
    const es = lang === "es" ? route : other;
    const en = lang === "en" ? route : other;
    const profundidad = route.replace(/^\/en(\/|$)/, "/").split("/").filter(Boolean).length;
    return {
      loc: absoluteUrl(route),
      priority: route === "/" || route === "/en" ? "1.0" : profundidad >= 2 ? "0.6" : "0.9",
      alternates: [
        es ? { hreflang: "es", href: absoluteUrl(es) } : null,
        en ? { hreflang: "en", href: absoluteUrl(en) } : null,
        es ? { hreflang: "x-default", href: absoluteUrl(es) } : null,
      ].filter((x): x is { hreflang: string; href: string } => x !== null),
    };
  });

export const render = (url: string) => {
  // El idioma se fija ANTES de renderizar: durante el render no hay efectos
  // ni navegador, así que si no se pone aquí el HTML sale en español.
  const lang = langOf(url);
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  const helmetContext: { helmet?: HelmetServerState } = {};
  const appHtml = renderToString(
    <AppProviders helmetContext={helmetContext}>
      <StaticRouter location={url}>
        <ScrollToTop />
        <AppRoutes />
      </StaticRouter>
    </AppProviders>,
  );

  const helmet = helmetContext.helmet;
  const head = helmet
    ? [helmet.title, helmet.meta, helmet.link, helmet.script]
        .map((tag) => tag.toString())
        .join("\n")
    : "";

  return { appHtml, head, lang };
};
