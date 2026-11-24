import { nearbyTowns } from "@/data/nearbyTowns";
import { DOGS_SLUG, MADRID_SLUG, POOL_BBQ_SLUG } from "@/lib/slugs";

export type Lang = "es" | "en";

export const SITE_URL = "https://www.casaeufemia.com";

/**
 * Cada página con su dirección en los dos idiomas.
 *
 * Hasta ahora el inglés vivía en las mismas direcciones que el español y se
 * cambiaba en el navegador, así que Google solo veía una versión y todo el
 * tráfico extranjero se perdía. Con direcciones propias y hreflang, cada
 * idioma se indexa por separado.
 *
 * Las direcciones en español NO se tocan: ya están indexadas y cambiarlas
 * tiraría el posicionamiento que tenemos.
 */
export interface RoutePair {
  es: string;
  en: string;
}

export const ROUTE_PAIRS: RoutePair[] = [
  { es: "/", en: "/en" },
  { es: "/gallery", en: "/en/gallery" },
  { es: "/blog", en: "/en/blog" },
  { es: "/pricing", en: "/en/pricing" },
  { es: `/${POOL_BBQ_SLUG}`, en: "/en/rural-house-with-pool-and-barbecue" },
  { es: `/${DOGS_SLUG}`, en: "/en/dog-friendly-rural-house" },
  { es: `/${MADRID_SLUG}`, en: "/en/rural-getaway-from-madrid" },
  ...nearbyTowns.map((town) => ({ es: `/${town.slug}`, en: `/en/${town.slugEn}` })),
];

/** Quita la barra final, que Vercel no la usa (trailingSlash: false). */
const limpiar = (pathname: string) =>
  !pathname ? "/" : pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

export const langOf = (pathname: string): Lang => {
  const p = limpiar(pathname);
  return p === "/en" || p.startsWith("/en/") ? "en" : "es";
};

/**
 * La misma página en el otro idioma, o null si no tiene equivalente.
 * Las entradas del blog comparten dirección salvo el prefijo /en.
 */
export const alternatePath = (pathname: string): string | null => {
  const p = limpiar(pathname);
  const par = ROUTE_PAIRS.find((x) => x.es === p || x.en === p);
  if (par) return langOf(p) === "en" ? par.es : par.en;
  if (p.startsWith("/en/blog/")) return p.slice(3);
  if (p.startsWith("/blog/")) return `/en${p}`;
  return null;
};

/** La dirección en español traducida al idioma que toque. */
export const localizedPath = (esPath: string, lang: Lang): string =>
  lang === "es" ? esPath : alternatePath(esPath) ?? esPath;

export const absoluteUrl = (pathname: string) =>
  new URL(limpiar(pathname), SITE_URL).toString();

/** Todas las direcciones que hay que prerenderizar e incluir en el sitemap. */
export const allPaths = (blogSlugs: string[]): string[] => [
  ...ROUTE_PAIRS.map((p) => p.es),
  ...blogSlugs.map((slug) => `/blog/${slug}`),
  ...ROUTE_PAIRS.map((p) => p.en),
  ...blogSlugs.map((slug) => `/en/blog/${slug}`),
];
