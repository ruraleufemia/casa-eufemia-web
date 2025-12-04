export interface BlogPost {
  id: number;
  titleKey: string;
  excerptKey: string;
  contentKey: string;
  image: string;
  images?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 4,
    titleKey: "posts.cooperativaVinas.title",
    excerptKey: "posts.cooperativaVinas.excerpt",
    contentKey: "posts.cooperativaVinas.content",
    image: "/IMG_4389.JPG",
    images: ["/IMG_4398.JPG", "/IMG_4469.JPG"]
  },
  {
    id: 1,
    titleKey: "posts.campoCriptana.title",
    excerptKey: "posts.campoCriptana.excerpt",
    contentKey: "posts.campoCriptana.content",
    image: "/IMG_4765.JPG",
    images: ["/IMG_4770.JPG"]
  },
  {
    id: 2,
    titleKey: "posts.casaMedrano.title",
    excerptKey: "posts.casaMedrano.excerpt",
    contentKey: "posts.casaMedrano.content",
    image: "/IMG_4586.JPG"
  },
  {
    id: 3,
    titleKey: "posts.lagunasRuidera.title",
    excerptKey: "posts.lagunasRuidera.excerpt",
    contentKey: "posts.lagunasRuidera.content",
    image: "/Ruidera1.jpg",
    images: ["/Ruidera2.jpg", "/Ruidera3.jpg", "/Ruidera4.jpg", "/Ruidera5.jpg"]
  }
];
