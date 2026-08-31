import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { blogPosts as staticPosts } from "@/data/blogPosts";
import { resolveMediaUrls } from "@/lib/media";

export interface ResolvedPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  images: string[];
}

/** Posts stored in the database plus the built-in ones, both localized. */
export const useBlogPosts = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "es";
  const [dbPosts, setDbPosts] = useState<ResolvedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (!active) return;

      const rows = data ?? [];
      const media = await resolveMediaUrls(rows.flatMap((r) => [r.image, ...(r.images ?? [])]));
      if (!active) return;

      setDbPosts(
        rows.map((r) => ({
          id: r.slug,
          title: lang === "en" ? r.title_en || r.title_es : r.title_es || r.title_en,
          excerpt: lang === "en" ? r.excerpt_en || r.excerpt_es : r.excerpt_es || r.excerpt_en,
          content: lang === "en" ? r.content_en || r.content_es : r.content_es || r.content_en,
          image: media[r.image] ?? r.image,
          images: (r.images ?? []).map((i) => media[i] ?? i),
        })),
      );
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [lang]);

  const builtIn: ResolvedPost[] = staticPosts.map((p) => ({
    id: String(p.id),
    title: t(p.titleKey),
    excerpt: t(p.excerptKey),
    content: t(p.contentKey),
    image: p.image,
    images: p.images ?? [],
  }));

  return { posts: [...dbPosts, ...builtIn], loading };
};
