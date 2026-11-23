import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FOTO = "/silvia-maya-bienvenida-casa-rural-eufemia.webp";

/**
 * Portada: Silvia y Maya al lado del texto.
 * La foto es vertical, así que va completa en su columna en lugar de
 * recortada de fondo. En móvil se apila: primero la foto, luego el texto.
 */
const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-muted/40 pt-20 md:pt-24">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-10 sm:px-6 sm:gap-12 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20">
        <div className="relative order-first lg:order-last">
          <img
            src={FOTO}
            alt={t("hero.imageAlt")}
            width={1000}
            height={1235}
            className="mx-auto w-full max-w-md rounded-xl object-cover shadow-sm lg:max-w-none"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
          <p className="mt-3 text-center text-sm font-light text-muted-foreground lg:text-left">
            {t("hero.imageCaption")}
          </p>
        </div>

        <div>
          <h1 className="font-display text-[1.9rem] font-light leading-[1.14] tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.1]">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-[52ch] text-base font-light leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
            {t("hero.lead")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("hero.ctaAvailability")}
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center rounded-md border border-border px-7 py-3.5 text-sm font-light text-foreground transition-colors hover:bg-background"
            >
              {t("hero.ctaGallery")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
