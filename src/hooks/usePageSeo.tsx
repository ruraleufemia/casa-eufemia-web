import { useTranslation } from "react-i18next";

export type SeoPage = "home" | "gallery" | "blog" | "pricing";

/** SEO page keys editable from the admin panel (site_content overrides i18n). */
export const SEO_PAGES: { page: SeoPage; label: string; path: string }[] = [
  { page: "home", label: "Inicio", path: "/" },
  { page: "gallery", label: "Galería", path: "/gallery" },
  { page: "blog", label: "Blog / Experiencias", path: "/blog" },
  { page: "pricing", label: "Precios", path: "/pricing" },
];

export const usePageSeo = (page: SeoPage) => {
  const { t } = useTranslation();
  return {
    title: t(`seo.${page}.title`),
    description: t(`seo.${page}.description`),
    keywords: t(`seo.${page}.keywords`),
  };
};
