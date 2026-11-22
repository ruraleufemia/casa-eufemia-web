import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-house.jpg";

interface HeroProps {
  videoUrl?: string;
  useVideo?: boolean;
  isYouTube?: boolean;
}

/** Degradado en añil, para que el texto se lea sin apagar la foto. */
const VELO =
  "linear-gradient(to top, rgba(22,36,79,0.84) 0%, rgba(22,36,79,0.46) 38%, rgba(22,36,79,0.06) 72%, rgba(22,36,79,0.22) 100%)";

const Hero = ({ videoUrl, useVideo = false, isYouTube = false }: HeroProps) => {
  const { t } = useTranslation();

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Foto o vídeo de fondo */}
      <div className="absolute inset-0 bg-black">
        {useVideo && videoUrl ? (
          isYouTube ? (
            <iframe
              src={videoUrl}
              title="Vídeo de Casa Rural Eufemia"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] border-0"
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              tabIndex={-1}
            />
          ) : (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster={heroImage}
            >
              <source src={videoUrl} type="video/mp4" />
              <img
                src={heroImage}
                alt="Casa Rural Eufemia en Arenales de San Gregorio"
                className="w-full h-full object-cover"
              />
            </video>
          )
        ) : (
          <img
            src={heroImage}
            alt="Casa Rural Eufemia en Arenales de San Gregorio"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        )}
        <div className="absolute inset-0" style={{ backgroundImage: VELO }} />
      </div>

      {/* Texto sobre la foto */}
      <div className="relative z-10 flex h-full flex-col justify-end">
        <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-12 lg:pb-24">
          <h1 className="max-w-[20ch] font-display text-[2rem] font-light leading-[1.12] tracking-tight text-white sm:text-5xl sm:leading-[1.08] lg:text-[3.4rem]">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-[52ch] text-base font-light leading-relaxed text-white/85 sm:mt-6 sm:text-lg">
            {t("hero.lead")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center rounded-md bg-background px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {t("hero.ctaAvailability")}
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center rounded-md border border-white/55 px-7 py-3.5 text-sm font-light text-white transition-colors hover:border-white hover:bg-white/10"
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
