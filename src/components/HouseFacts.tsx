import { useTranslation } from "react-i18next";

/**
 * Franja de datos justo debajo de la portada.
 *
 * Es lo primero que mira quien busca casa para un grupo: cuántos caben,
 * cuántas camas y si hay piscina. Cuanto antes lo responda la web, menos
 * gente se va a buscar a otra parte.
 */
const DATOS = [
  "people",
  "bedrooms",
  "bathrooms",
  "surface",
  "pool",
  "bbq",
  "stepFree",
  "pets",
] as const;

const HouseFacts = () => {
  const { t } = useTranslation();

  return (
    <section aria-label={t("facts.heading")} className="border-b border-border bg-card">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-6 px-5 py-8 sm:grid-cols-4 sm:px-8 lg:px-12">
        {DATOS.map((dato) => (
          <li key={dato} className="text-center sm:text-left">
            <p className="font-display text-xl font-light leading-tight text-primary sm:text-2xl">
              {t(`facts.${dato}.value`)}
            </p>
            <p className="mt-1 text-sm font-light leading-snug text-muted-foreground">
              {t(`facts.${dato}.label`)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HouseFacts;
