export interface BlogPost {
  id: number;
  slug: string;
  titleKey: string;
  excerptKey: string;
  contentKey: string;
  image: string;
  images?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 4,
    slug: "cooperativa-virgen-de-las-vinas",
    titleKey: "posts.cooperativaVinas.title",
    excerptKey: "posts.cooperativaVinas.excerpt",
    contentKey: "posts.cooperativaVinas.content",
    image: "/fotos/cueva-tinajas-tomelloso.webp",
    images: ["/fotos/tinajas-pintadas-tomelloso.webp"]
  },
  {
    id: 1,
    slug: "campo-de-criptana-molinos-de-viento",
    titleKey: "posts.campoCriptana.title",
    excerptKey: "posts.campoCriptana.excerpt",
    contentKey: "posts.campoCriptana.content",
    image: "/fotos/molinos-campo-de-criptana.webp",
    images: ["/fotos/molino-atardecer-campo-de-criptana.webp", "/fotos/mural-quijote-campo-de-criptana.webp"]
  },
  {
    id: 2,
    slug: "casa-de-medrano-argamasilla-de-alba",
    titleKey: "posts.casaMedrano.title",
    excerptKey: "posts.casaMedrano.excerpt",
    contentKey: "posts.casaMedrano.content",
    image: "/fotos/cueva-de-medrano.webp"
  },
  {
    id: 3,
    slug: "lagunas-de-ruidera",
    titleKey: "posts.lagunasRuidera.title",
    excerptKey: "posts.lagunasRuidera.excerpt",
    contentKey: "posts.lagunasRuidera.content",
    image: "/fotos/lagunas-de-ruidera.webp",
    images: ["/fotos/lagunas-de-ruidera-entre-ramas.webp", "/fotos/castillo-de-penarroya.webp"]
  }
];
