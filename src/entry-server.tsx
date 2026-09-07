import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import type { HelmetServerState } from "react-helmet-async";
import { AppProviders, AppRoutes } from "./App";
import ScrollToTop from "./components/ScrollToTop";
import { blogPosts } from "./data/blogPosts";
import "./index.css";
import "./i18n/config";

export const prerenderRoutes = [
  "/",
  "/gallery",
  "/blog",
  "/pricing",
  ...blogPosts.map((post) => `/blog/${post.slug}`),
];

export const render = (url: string) => {
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

  return { appHtml, head };
};
