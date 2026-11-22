/** Páginas de cercanía: una por pueblo, pensadas para las búsquedas locales. */
export interface NearbyTown {
  /** Dirección de la página, sin barra final. */
  slug: string;
  /** Prefijo de las claves de traducción en los archivos de idioma. */
  key: string;
  image: string;
  imageAlt: string;
  /** Guía del blog relacionada, para enlazar entre ellas. */
  guideSlug: string;
  minutes: string;
}

export const nearbyTowns: NearbyTown[] = [
  {
    slug: "casa-rural-cerca-de-campo-de-criptana",
    key: "campoDeCriptana",
    image: "/IMG_4765.JPG",
    imageAlt: "Molinos de viento de Campo de Criptana al atardecer",
    guideSlug: "campo-de-criptana-molinos-de-viento",
    minutes: "10",
  },
  {
    slug: "casa-rural-cerca-de-tomelloso",
    key: "tomelloso",
    image: "/IMG_4389.JPG",
    imageAlt: "Bodega Virgen de las Viñas en Tomelloso",
    guideSlug: "cooperativa-virgen-de-las-vinas",
    minutes: "15-20",
  },
];

export const findNearbyTown = (slug: string) =>
  nearbyTowns.find((town) => town.slug === slug);
