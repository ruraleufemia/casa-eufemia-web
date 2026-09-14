import { useTranslation } from "react-i18next";

export type SeoPage = "home" | "gallery" | "blog" | "pricing";
export type SeoField = "title" | "description" | "keywords";

type SeoValues = Record<SeoField, string>;
type SeoDefaults = Record<SeoPage, SeoValues>;

const SEO_DEFAULTS: Record<"es" | "en", SeoDefaults> = {
  es: {
    home: {
      title: "Casa Rural Eufemia | Arenales de San Gregorio",
      description: "Casa Rural Eufemia en Arenales de San Gregorio, Ciudad Real: hasta 8 personas, piscina privada, jardín, barbacoa, dos baños y mascotas bajo consulta.",
      keywords: "casa rural eufemia, casa rural en Ciudad Real, casa rural en Arenales de San Gregorio, casa rural cerca de Tomelloso, casa rural para 8 personas, casa rural con piscina privada en Ciudad Real, casa rural pet friendly, casa rural con dos baños, casa rural con baño exterior, alojamiento rural en La Mancha, casa rural en La Mancha, casa rural para familias, casa rural para grupos, casa rural con jardín y barbacoa",
    },
    gallery: {
      title: "Galería Casa Rural Eufemia | Arenales de San Gregorio",
      description: "Fotos de Casa Rural Eufemia: piscina privada, jardín, barbacoa, dos baños y estancias para hasta 8 personas en Ciudad Real.",
      keywords: "galería casa rural eufemia, fotos casa rural Ciudad Real, piscina privada casa rural, jardín y barbacoa, casa rural con dos baños, casa rural pet friendly",
    },
    blog: {
      title: "Experiencias Locales - Casa Rural Eufemia",
      description: "Descubre experiencias gastronómicas y culturales cerca de Casa Rural Eufemia. Guía de turismo, rutas, restaurantes y actividades en Ciudad Real.",
      keywords: "turismo Ciudad Real, experiencias rurales, gastronomía La Mancha, que hacer en Ciudad Real, rutas turísticas, actividades rurales España",
    },
    pricing: {
      title: "Precios y disponibilidad | Casa Rural Eufemia",
      description: "Consulta precio y disponibilidad de Casa Rural Eufemia por WhatsApp. Mejoramos precios y condiciones en reservas directas.",
      keywords: "precios Casa Rural Eufemia, tarifas casa rural, alojamiento Ciudad Real, casa rural pet friendly, casa rural con dos baños, reservar casa rural",
    },
  },
  en: {
    home: {
      title: "Casa Rural Eufemia | Arenales de San Gregorio",
      description: "Casa Rural Eufemia in Arenales de San Gregorio, Ciudad Real: up to 8 guests, private pool, garden, barbecue, two bathrooms and pets by prior arrangement.",
      keywords: "Casa Rural Eufemia, rural house Ciudad Real, rural house Arenales de San Gregorio, rural house near Tomelloso, rural house for 8 people, private pool rural house Ciudad Real, pet friendly rural house, rural house two bathrooms",
    },
    gallery: {
      title: "Casa Rural Eufemia gallery | Arenales de San Gregorio",
      description: "Photos of Casa Rural Eufemia: private pool, garden, barbecue, two bathrooms and rooms for up to 8 guests in Ciudad Real.",
      keywords: "Casa Rural Eufemia gallery, rural house photos Ciudad Real, private pool rural house, garden and barbecue, pet friendly rural house, rural house two bathrooms",
    },
    blog: {
      title: "Local Experiences - Casa Rural Eufemia",
      description: "Discover the best gastronomic and cultural experiences near Casa Rural Eufemia. Local tourism guide, routes, restaurants and activities in Ciudad Real.",
      keywords: "tourism Ciudad Real, rural experiences, La Mancha gastronomy, what to do in Ciudad Real, tourist routes, rural activities Spain",
    },
    pricing: {
      title: "Rates and availability | Casa Rural Eufemia",
      description: "Check Casa Rural Eufemia prices and availability via WhatsApp. We improve prices and conditions for direct bookings.",
      keywords: "Casa Rural Eufemia rates, rural house prices, Ciudad Real accommodation, pet friendly rural house, rural house two bathrooms, book rural house",
    },
  },
};

const LEGACY_SEO_DEFAULTS: Record<"es" | "en", SeoDefaults> = {
  es: {
    home: {
      title: "Casa rural en Arenales de San Gregorio | Casa Eufemia",
      description: "Casa rural con piscina privada en Ciudad Real para 8 personas, en Arenales de San Gregorio, cerca de Tomelloso, con jardín y barbacoa.",
      keywords: "casa rural en Ciudad Real, casa rural en Arenales de San Gregorio, casa rural cerca de Tomelloso, casa rural para 8 personas, casa rural con piscina privada en Ciudad Real, alojamiento rural en La Mancha, casa rural en La Mancha, casa rural para familias, casa rural para grupos, casa rural con jardín y barbacoa",
    },
    gallery: {
      title: "Galería de Casa Eufemia | Casa rural en Arenales de San Gregorio",
      description: "Fotos de Casa Eufemia: casa rural en Arenales de San Gregorio con piscina privada, jardín, barbacoa y dormitorios para hasta 8 personas.",
      keywords: "galería casa rural Arenales de San Gregorio, fotos casa rural Ciudad Real, piscina privada casa rural, jardín y barbacoa, casa rural para 8 personas",
    },
    blog: {
      title: "Experiencias Locales - Blog de Casa Eufemia",
      description: "Descubre las mejores experiencias gastronómicas y culturales cerca de Casa Eufemia. Guía de turismo local, rutas, restaurantes y actividades en Ciudad Real.",
      keywords: "turismo Ciudad Real, experiencias rurales, gastronomía La Mancha, que hacer en Ciudad Real, rutas turísticas, actividades rurales España",
    },
    pricing: {
      title: "Precios y Disponibilidad - Casa Eufemia",
      description: "Consulta precio y disponibilidad de Casa Eufemia por WhatsApp. Mejoramos precios y condiciones en reservas directas.",
      keywords: "precios casa rural, tarifas alquiler, alojamiento Ciudad Real, casa rural económica, reservar casa rural",
    },
  },
  en: {
    home: {
      title: "Rural house in Arenales de San Gregorio | Casa Eufemia",
      description: "Rural house with a private pool in Ciudad Real for up to 8 people, in Arenales de San Gregorio, near Tomelloso, with a garden and barbecue.",
      keywords: "rural house Ciudad Real, rural house Arenales de San Gregorio, rural house near Tomelloso, rural house for 8 people, private pool rural house Ciudad Real",
    },
    gallery: {
      title: "Casa Eufemia gallery | Rural house in Arenales de San Gregorio",
      description: "Photos of Casa Eufemia: a rural house in Arenales de San Gregorio with a private pool, garden, barbecue and bedrooms for up to 8 people.",
      keywords: "rural house gallery Arenales de San Gregorio, rural house photos Ciudad Real, private pool rural house, garden and barbecue",
    },
    blog: {
      title: "Local Experiences - Casa Eufemia Blog",
      description: "Discover the best gastronomic and cultural experiences near Casa Eufemia. Local tourism guide, routes, restaurants and activities in Ciudad Real.",
      keywords: "tourism Ciudad Real, rural experiences, La Mancha gastronomy, what to do in Ciudad Real, tourist routes, rural activities Spain",
    },
    pricing: {
      title: "Rates and Availability - Casa Eufemia",
      description: "Check price and availability of Casa Eufemia via WhatsApp. We improve prices and conditions for direct bookings.",
      keywords: "rural house rates, rental prices, Ciudad Real accommodation, book rural house",
    },
  },
};

const getLanguage = (language?: string) => (language?.startsWith("en") ? "en" : "es");

export const getSeoDefault = (language: string | undefined, page: SeoPage, field: SeoField) =>
  SEO_DEFAULTS[getLanguage(language)][page][field];

/** SEO page keys editable from the admin panel (site_content overrides i18n). */
export const SEO_PAGES: { page: SeoPage; label: string; path: string }[] = [
  { page: "home", label: "Inicio", path: "/" },
  { page: "gallery", label: "Galería", path: "/gallery" },
  { page: "blog", label: "Blog / Experiencias", path: "/blog" },
  { page: "pricing", label: "Precios", path: "/pricing" },
];

export const usePageSeo = (page: SeoPage) => {
  const { t, i18n } = useTranslation();
  const language = getLanguage(i18n.language);
  const getValue = (field: SeoField) => {
    const value = t(`seo.${page}.${field}`);
    return value === LEGACY_SEO_DEFAULTS[language][page][field]
      ? SEO_DEFAULTS[language][page][field]
      : value;
  };

  return {
    title: getValue("title"),
    description: getValue("description"),
    keywords: getValue("keywords"),
  };
};
