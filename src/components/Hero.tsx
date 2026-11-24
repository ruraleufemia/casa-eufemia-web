import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalePath } from "@/hooks/useLocalePath";

const FOTO = "/fotos/piscina-privada-casa-rural-eufemia.webp";
const FOTO_800 = "/fotos/piscina-privada-casa-rural-eufemia-800.webp";

/**
 * Portada: la piscina a toda pantalla, que es lo que busca una familia
 * en verano y lo que nos diferencia de las otras casas del pueblo.
 *
 * Dos comportamientos con un solo trozo de HTML:
 *  - En móvil la foto va entera arriba (4:3, para que la piscina se vea
 *    completa) y el texto debajo sobre añil, que se lee sin esfuerzo.
 *  - En escritorio la foto pasa a fondo y el texto se le pone encima,
 *    con un degradado oscuro por abajo para que no se pierda.
 *
 * La foto es la LCP de la página, así que va con fetchpriority alta,
 * sin lazy y con una versión de 800 px para el móvil.
 */
const Hero = () => {
  const { t } = useTranslation();
  const ruta = useLocalePath();

  return (
    <section className="relative isolate overflow-hidden lg:flex lg:min-h-[76vh] lg:items-end">
      <img
        src={FOTO}
        srcSet={`${FOTO_800} 800w, ${FOTO} 1200w`}
        sizes="100vw"
        width={1200}
        height={800}
        alt={t("hero.imageAlt")}
        className="aspect-[4/3] w-full object-cover sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
        loading="eager"
        decoding="async"
        fetchpriority="high"
      />

      {/* Velo solo en escritorio, que es donde el texto va encima de la foto. */}
      <div
        aria-hidden="true"
        className="hidden bg-gradient-to-t from-[hsl(225_56%_12%/0.9)] via-[hsl(225_56%_12%/0.5)] to-transparent lg:absolute lg:inset-0 lg:block"
      />

      <div className="relative bg-primary px-5 py-10 text-primary-foreground sm:px-8 sm:py-12 lg:mx-auto lg:w-full lg:max-w-7xl lg:bg-transparent lg:px-12 lg:pb-20 lg:pt-44">
        <p className="font-display text-sm font-light italic tracking-wide text-secondary">
          {t("hero.tagline")}
        </p>
        <h1 className="mt-3 max-w-[28ch] font-display text-[1.75rem] font-light leading-[1.16] tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.08]">
          {t("hero.title")}
        </h1>
        <p className="mt-5 max-w-[56ch] text-base font-light leading-relaxed text-primary-foreground/90 sm:text-lg">
          {t("hero.lead")}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link
            to={ruta("/pricing")}
            className="inline-flex items-center justify-center rounded-md bg-secondary px-7 py-3.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/90"
          >
            {t("hero.ctaAvailability")}
          </Link>
          <Link
            to={ruta("/gallery")}
            className="inline-flex items-center justify-center rounded-md border border-primary-foreground/40 px-7 py-3.5 text-sm font-light text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            {t("hero.ctaGallery")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
