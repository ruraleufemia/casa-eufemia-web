import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";

interface RatingResponse {
  configured?: boolean;
  rating?: number | null;
  userRatingCount?: number | null;
  googleMapsUri?: string;
}

const ENLACE_POR_DEFECTO =
  "https://www.google.com/maps/place/?q=place_id:ChIJbSYSx-1VaA0RKuoR6Iyw8fI";

/**
 * Primera franja de la portada: la valoración de Google.
 *
 * Los datos de Google no se pueden guardar en caché, así que llegan después
 * de cargar la página. Por eso la franja tiene altura fija y las estrellas
 * se pintan desde el principio: así no da ningún salto al rellenarse.
 */
const GoogleRatingBar = () => {
  const { t, i18n } = useTranslation();
  const [datos, setDatos] = useState<RatingResponse | null>(null);

  useEffect(() => {
    let vivo = true;
    fetch("/api/google-reviews")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (vivo && d) setDatos(d);
      })
      .catch(() => {
        /* si falla, se queda el texto genérico */
      });
    return () => {
      vivo = false;
    };
  }, []);

  const nota = typeof datos?.rating === "number" ? datos.rating : null;
  const total =
    typeof datos?.userRatingCount === "number" ? datos.userRatingCount : null;
  const enlace = datos?.googleMapsUri || ENLACE_POR_DEFECTO;

  const notaTexto =
    nota === null
      ? null
      : i18n.language?.startsWith("en")
        ? nota.toFixed(1)
        : nota.toFixed(1).replace(".", ",");

  return (
    <section className="bg-secondary pt-20 md:pt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <a
          href={enlace}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[3.25rem] flex-wrap items-center justify-center gap-x-2 gap-y-1 py-3 text-center text-secondary-foreground transition-opacity hover:opacity-80"
        >
          <span className="flex items-center gap-0.5" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />
            ))}
          </span>
          {notaTexto && (
            <span className="text-base font-medium sm:text-lg">{notaTexto}</span>
          )}
          <span className="text-sm font-light sm:text-base">
            {total === null
              ? t("ratingBar.generic")
              : t("ratingBar.count", { total })}
          </span>
        </a>
      </div>
    </section>
  );
};

export default GoogleRatingBar;
