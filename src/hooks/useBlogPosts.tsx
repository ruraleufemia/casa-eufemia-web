import { useTranslation } from "react-i18next";
import { blogPosts as staticPosts } from "@/data/blogPosts";

export interface ResolvedPost {
  id: string;
  legacyId?: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  images: string[];
}

/** Entradas del blog, traducidas al idioma activo. */
export const useBlogPosts = () => {
  const { t } = useTranslation();

  const posts: ResolvedPost[] = staticPosts.map((p) => ({
    id: p.slug,
    legacyId: String(p.id),
    title: t(p.titleKey),
    excerpt: t(p.excerptKey),
    content: t(p.contentKey),
    image: p.image,
    images: p.images ?? [],
  }));

  return { posts, loading: false };
};
