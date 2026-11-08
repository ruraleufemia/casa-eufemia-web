import { supabase } from "@/integrations/supabase/client";

export type Rates = {
  night: string;
  weekend: string;
  highSeason: string;
  minNights: string;
  petFee: string;
  noteEs: string;
  noteEn: string;
  published: boolean;
};

export const emptyRates: Rates = {
  night: "", weekend: "", highSeason: "", minNights: "", petFee: "",
  noteEs: "", noteEn: "", published: false,
};

export const rateKeys = ["night", "weekend", "highSeason", "minNights", "petFee", "noteEs", "noteEn", "published"] as const;

export async function loadRates(): Promise<Rates> {
  const { data, error } = await supabase.from("site_content")
    .select("key, value_es, value_en")
    .in("key", rateKeys.map((field) => `rates.${field}`));
  if (error) throw error;
  const result = { ...emptyRates };
  for (const row of data ?? []) {
    const field = row.key.replace(/^rates\./, "") as keyof Rates;
    if (field === "published") result.published = row.value_es === "true";
    else if (field === "noteEn") result.noteEn = row.value_en;
    else if (field in result) (result as Record<string, string | boolean>)[field] = row.value_es;
  }
  return result;
}

export function isValidRate(value: string): boolean {
  return value === "" || (/^\d+(?:[.,]\d{1,2})?$/.test(value.trim()) && Number(value.replace(",", ".")) > 0);
}

export function formatRate(value: string, language: string): string {
  const amount = Number(value.replace(",", "."));
  return new Intl.NumberFormat(language.startsWith("en") ? "en-GB" : "es-ES", {
    style: "currency", currency: "EUR", maximumFractionDigits: 2,
  }).format(amount);
}
