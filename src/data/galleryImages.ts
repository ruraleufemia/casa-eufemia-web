export type GalleryCategory = "casa" | "patio" | "alrededores";

export interface GalleryImage {
  alt: string;
  category: GalleryCategory;
  /** Ruta original del archivo, para no romper enlaces ya existentes. */
  legacySrc: string;
  /** Dirección pública y descriptiva, la que usan la galería y Google Imágenes. */
  src: string;
}

/**
 * Galería seleccionada: tres secciones y las fotos que de verdad venden.
 * Antes había 91, muchas repetidas, y la página tardaba casi cinco segundos.
 */
export const galleryImages: GalleryImage[] = [
  {
    src: "/cena-noche-piscina-casa-rural-eufemia.webp",
    legacySrc: "/cena-noche-piscina-casa-rural-eufemia.webp",
    alt: "Cena de noche junto a la piscina privada de Casa Rural Eufemia",
    category: "patio",
  },
  {
    src: "/comida-grupo-patio-casa-rural-eufemia.webp",
    legacySrc: "/comida-grupo-patio-casa-rural-eufemia.webp",
    alt: "Comida de grupo en el patio de la casa rural, con paella y vino",
    category: "patio",
  },
  {
    src: "/5. Picoteo.jpg",
    legacySrc: "/5. Picoteo.jpg",
    alt: "Mesa puesta con vino junto a la piscina privada",
    category: "patio",
  },
  {
    src: "/Picoteo 2.jpg",
    legacySrc: "/Picoteo 2.jpg",
    alt: "Mesa preparada en el patio con la piscina al fondo",
    category: "patio",
  },
  {
    src: "/nuevasfotoscasa/IMG-20260530-WA0009.jpg",
    legacySrc: "/nuevasfotoscasa/IMG-20260530-WA0009.jpg",
    alt: "Piscina privada iluminada de noche en la casa rural",
    category: "patio",
  },
  {
    src: "/nuevasfotoscasa/IMG-20260530-WA0006.jpg",
    legacySrc: "/nuevasfotoscasa/IMG-20260530-WA0006.jpg",
    alt: "Cascada de la piscina privada de Casa Rural Eufemia",
    category: "patio",
  },
  {
    src: "/nuevasfotoscasa/IMG-20260530-WA0011.jpg",
    legacySrc: "/nuevasfotoscasa/IMG-20260530-WA0011.jpg",
    alt: "Porche cubierto con la parra y la mesa del patio",
    category: "patio",
  },
  {
    src: "/nuevasfotoscasa/IMG-20260530-WA0003.jpg",
    legacySrc: "/nuevasfotoscasa/IMG-20260530-WA0003.jpg",
    alt: "Porche del patio manchego con mesas de piedra",
    category: "patio",
  },
  {
    src: "/nuevasfotoscasa/IMG-20260530-WA0031.jpg",
    legacySrc: "/nuevasfotoscasa/IMG-20260530-WA0031.jpg",
    alt: "Piscina privada con el césped y la zona de tumbonas",
    category: "patio",
  },
  {
    src: "/nuevasfotoscasa/IMG-20260530-WA0058.jpg",
    legacySrc: "/nuevasfotoscasa/IMG-20260530-WA0058.jpg",
    alt: "Horno de leña del porche de Casa Rural Eufemia",
    category: "patio",
  },
  {
    src: "/nuevasfotoscasa/IMG-20260530-WA0060.jpg",
    legacySrc: "/nuevasfotoscasa/IMG-20260530-WA0060.jpg",
    alt: "Barbacoa cubierta junto al horno de leña, en el porche",
    category: "patio",
  },
  {
    src: "/nuevasfotoscasa/WhatsApp Image 2026-09-03 at 12.31.22.jpeg",
    legacySrc: "/nuevasfotoscasa/WhatsApp Image 2026-09-03 at 12.31.22.jpeg",
    alt: "Tumbona junto a la piscina privada de la casa rural",
    category: "patio",
  },
  {
    src: "/6. Piscina.jpg",
    legacySrc: "/6. Piscina.jpg",
    alt: "Escalones de acceso a la piscina privada",
    category: "patio",
  },
  {
    src: "/1. Fachada.jpg",
    legacySrc: "/1. Fachada.jpg",
    alt: "Fachada encalada de Casa Rural Eufemia en Arenales de San Gregorio",
    category: "casa",
  },
  {
    src: "/3. Salon.jpg",
    legacySrc: "/3. Salon.jpg",
    alt: "Salón manchego con la colección de vinos de Casa Rural Eufemia",
    category: "casa",
  },
  {
    src: "/nuevasfotoscasa/IMG-20260530-WA0036.jpg",
    legacySrc: "/nuevasfotoscasa/IMG-20260530-WA0036.jpg",
    alt: "Mesa del comedor puesta para ocho personas en Casa Rural Eufemia",
    category: "casa",
  },
  {
    src: "/nuevasfotoscasa/IMG-20260530-WA0055.jpg",
    legacySrc: "/nuevasfotoscasa/IMG-20260530-WA0055.jpg",
    alt: "Chimenea del salón de la casa rural, encendida en invierno",
    category: "casa",
  },
  {
    src: "/nuevasfotoscasa/IMG-20260530-WA0047.jpg",
    legacySrc: "/nuevasfotoscasa/IMG-20260530-WA0047.jpg",
    alt: "Tinajas manchegas y rueda de carro en el salón de Casa Rural Eufemia",
    category: "casa",
  },
  {
    src: "/nuevasfotoscasa/IMG-20260530-WA0051.jpg",
    legacySrc: "/nuevasfotoscasa/IMG-20260530-WA0051.jpg",
    alt: "Pasillo interior de la casa rural, con suelo hidráulico",
    category: "casa",
  },
  {
    src: "/nuevasfotoscasa/IMG-20260530-WA0032.jpg",
    legacySrc: "/nuevasfotoscasa/IMG-20260530-WA0032.jpg",
    alt: "Cocina equipada de la casa rural, con horno y vitrocerámica",
    category: "casa",
  },
  {
    src: "/nuevasfotoscasa/IMG-20260530-WA0041.jpg",
    legacySrc: "/nuevasfotoscasa/IMG-20260530-WA0041.jpg",
    alt: "Dormitorio principal con cama de matrimonio en Casa Rural Eufemia",
    category: "casa",
  },
  {
    src: "/Cuarto principal.jpg",
    legacySrc: "/Cuarto principal.jpg",
    alt: "Segundo dormitorio de matrimonio de la casa rural",
    category: "casa",
  },
  {
    src: "/4. Cuarto 2.jpg",
    legacySrc: "/4. Cuarto 2.jpg",
    alt: "Dormitorio con dos camas individuales, para niños",
    category: "casa",
  },
  {
    src: "/nuevasfotoscasa/IMG-20260530-WA0029.jpg",
    legacySrc: "/nuevasfotoscasa/IMG-20260530-WA0029.jpg",
    alt: "Baño completo de la casa rural, con azulejo manchego",
    category: "casa",
  },
  {
    src: "/nuevasfotoscasa/WhatsApp Image 2026-09-03 at 12.31.59 (1).jpeg",
    legacySrc: "/nuevasfotoscasa/WhatsApp Image 2026-09-03 at 12.31.59 (1).jpeg",
    alt: "Alacena azul antigua, uno de los rincones de la casa",
    category: "casa",
  },
  {
    src: "/IMG_4765.JPG",
    legacySrc: "/IMG_4765.JPG",
    alt: "Molinos de viento de Campo de Criptana al atardecer, a diez minutos",
    category: "alrededores",
  },
  {
    src: "/Ruidera1.jpg",
    legacySrc: "/Ruidera1.jpg",
    alt: "Lagunas de Ruidera, a una hora de la casa rural",
    category: "alrededores",
  },
  {
    src: "/pexels-emilio-sanchez-hernandez-285921208-34476076.jpg",
    legacySrc: "/pexels-emilio-sanchez-hernandez-285921208-34476076.jpg",
    alt: "Agua turquesa de las Lagunas de Ruidera",
    category: "alrededores",
  },
  {
    src: "/Ruidera5.jpg",
    legacySrc: "/Ruidera5.jpg",
    alt: "Vista aérea de las Lagunas de Ruidera",
    category: "alrededores",
  },
  {
    src: "/IMG_4586.JPG",
    legacySrc: "/IMG_4586.JPG",
    alt: "Cueva excavada de Tomelloso, visita de enoturismo",
    category: "alrededores",
  },
  {
    src: "/IMG_4469.JPG",
    legacySrc: "/IMG_4469.JPG",
    alt: "Bodega de Tomelloso, con la colección de vinos de La Mancha",
    category: "alrededores",
  },
  {
    src: "/Ruidera3.jpg",
    legacySrc: "/Ruidera3.jpg",
    alt: "Paisaje de las Lagunas de Ruidera entre juncos",
    category: "alrededores",
  },
];
