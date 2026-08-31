import { useEffect } from "react";
import i18n from "@/i18n/config";
import { supabase } from "@/integrations/supabase/client";

/**
 * Loads text overrides stored in the database and applies them on top of the
 * bundled translations. Keys match i18n keys, e.g. "hero.title".
 */
export const useSiteContentOverrides = () => {
  useEffect(() => {
    let active = true;

    (async () => {
      const { data } = await supabase.from("site_content").select("key, value_es, value_en");
      if (!active || !data) return;

      data.forEach((row) => {
        if (row.value_es) i18n.addResource("es", "translation", row.key, row.value_es);
        if (row.value_en) i18n.addResource("en", "translation", row.key, row.value_en);
      });
      i18n.emit("languageChanged", i18n.language);
    })();

    return () => {
      active = false;
    };
  }, []);
};
