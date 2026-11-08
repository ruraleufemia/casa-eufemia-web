import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { emptyRates, formatRate, isValidRate, loadRates, type Rates } from "@/lib/rates";

export const RatesCards = ({ rates, language }: { rates: Rates; language: string }) => {
  const en = language.startsWith("en");
  const options = [
    { key: "night", label: en ? "Nightly rate from" : "Precio por noche desde" },
    { key: "weekend", label: en ? "Weekend night from" : "Noche de fin de semana desde" },
    { key: "highSeason", label: en ? "High-season night from" : "Noche de temporada alta desde" },
  ] as const;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {options.filter(({ key }) => rates[key] && isValidRate(rates[key])).map(({ key, label }) => (
          <Card key={key} className="border-border bg-card">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="mt-2 font-display text-3xl text-foreground">{formatRate(rates[key], language)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {(rates.minNights || rates.petFee || rates.noteEs || rates.noteEn) && (
        <div className="mt-5 space-y-1 text-sm leading-relaxed text-muted-foreground">
          {rates.minNights && <p>{en ? "Minimum stay" : "Estancia mínima"}: {rates.minNights} {en ? "nights" : "noches"}.</p>}
          {rates.petFee && isValidRate(rates.petFee) && <p>{en ? "Pet supplement" : "Suplemento por mascota"}: {formatRate(rates.petFee, language)}. {en ? "Ask about the conditions before booking." : "Consulta las condiciones antes de reservar."}</p>}
          {(en ? rates.noteEn || rates.noteEs : rates.noteEs) && <p>{en ? rates.noteEn || rates.noteEs : rates.noteEs}</p>}
        </div>
      )}
    </>
  );
};

const RatesSection = () => {
  const { i18n } = useTranslation();
  const [rates, setRates] = useState<Rates>(emptyRates);

  useEffect(() => {
    let active = true;
    loadRates().then((loaded) => { if (active) setRates(loaded); }).catch(() => {});
    return () => { active = false; };
  }, []);

  if (!rates.published || !rates.night) return null;

  return (
    <section className="px-4 pb-16" aria-labelledby="rates-heading">
      <div className="mx-auto max-w-5xl">
        <h2 id="rates-heading" className="mb-2 text-center font-display text-3xl font-light">
          {i18n.language.startsWith("en") ? "Indicative rates" : "Tarifas orientativas"}
        </h2>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          {i18n.language.startsWith("en") ? "Final price depends on your dates. Ask us for a quote." : "El precio final depende de las fechas. Consúltanos para recibir un presupuesto."}
        </p>
        <RatesCards rates={rates} language={i18n.language} />
      </div>
    </section>
  );
};

export default RatesSection;
