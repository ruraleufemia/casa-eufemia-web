import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { resolveMediaUrls } from "@/lib/media";

export interface GalleryItem {
  src: string;
  alt: string;
}

/** Gallery images stored in the database (appended to the built-in ones). */
export const useGalleryImages = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "es";
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    let active = true;

    (async () => {
      const { data } = await supabase
        .from("gallery_images")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (!active || !data) return;
      const media = await resolveMediaUrls(data.map((r) => r.url));
      if (!active) return;

      setItems(
        data.map((r) => ({
          src: media[r.url] ?? r.url,
          alt: (lang === "en" ? r.alt_en || r.alt_es : r.alt_es || r.alt_en) || "Casa Eufemia",
        })),
      );
    })();

    return () => {
      active = false;
    };
  }, [lang]);

  return items;
};
