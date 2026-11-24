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
 * Valores que se enseñan mientras Google no responde.
 *
 * Hoy la función /api/google-reviews devuelve configured:false porque falta
 * la clave GOOGLE_MAPS_API_KEY en Vercel. Mientras tanto se muestran estos,
 * comprobados en la ficha de Google el 24/11/2026. En cuanto se ponga la
 * clave, la nota y el número vienen de Google solos y esto deja de usarse.
 *
 * OJO: si pasan meses sin poner la clave, hay que actualizar el número de
 * reseñas a mano, porque crece.
 */
const NOTA_POR_DEFECTO = 5;
const RESENAS_POR_DEFECTO = 78;

/** Primera franja de la portada: la valoración de Google, bien visible. */
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
        /* si falla, se queda la nota por defecto */
      });
    return () => {
      vivo = false;
    };
  }, []);

  const nota = typeof datos?.rating === "number" ? datos.rating : NOTA_POR_DEFECTO;
  const total =
    typeof datos?.userRatingCount === "number"
      ? datos.userRatingCount
      : RESENAS_POR_DEFECTO;
  const enlace = datos?.googleMapsUri || ENLACE_POR_DEFECTO;

  const notaTexto = i18n.language?.startsWith("en")
    ? nota.toFixed(1)
    : nota.toFixed(1).replace(".", ",");

  return (
    <section className="bg-secondary pt-20 md:pt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <a
          href={enlace}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("ratingBar.aria", { nota: notaTexto, total })}
          className="flex items-center justify-center gap-3 py-4 text-secondary-foreground transition-opacity hover:opacity-80 sm:gap-4"
        >
          <span className="font-display text-4xl font-light leading-none sm:text-5xl">
            {notaTexto}
          </span>
          {/* Separador: sin él, "5,0" y "78 reseñas" se leen pegados: "5,078 reseñas". */}
          <span aria-hidden="true" className="text-xl font-light opacity-40">
            |
          </span>
          <span className="flex flex-col items-start gap-1.5">
            <span className="flex items-center gap-0.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-current sm:h-[18px] sm:w-[18px]" strokeWidth={0} />
              ))}
            </span>
            <span className="text-sm font-light sm:text-base">
              {t("ratingBar.count", { total })}
            </span>
          </span>
        </a>
      </div>
    </section>
  );
};

export default GoogleRatingBar;
