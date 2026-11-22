import type { Rates } from "@/lib/rates";

/**
 * Tarifas que se muestran en la web.
 *
 * Mientras `published` sea false no aparece ninguna sección de precios
 * (es como está la web ahora). Para publicarlas, pon `published: true`
 * y rellena los importes en euros, sin el símbolo: "180", "195,50"...
 */
export const rates: Rates = {
  night: "",
  weekend: "",
  highSeason: "",
  minNights: "",
  petFee: "",
  noteEs: "",
  noteEn: "",
  published: false,
};
