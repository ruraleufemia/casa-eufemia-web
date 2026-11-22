
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
  const { rates } = await import("@/data/rates");
  return { ...emptyRates, ...rates };
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
