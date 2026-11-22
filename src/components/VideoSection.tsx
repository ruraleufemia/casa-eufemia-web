import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Play } from "lucide-react";

const POSTER = "/fachada-casa-rural-eufemia.webp";
const VIDEO_ID = "iUC5-n8IP-Q";

/**
 * Vídeo de la casa. No se carga hasta que se pulsa: así la portada
 * sigue abriendo rápido, que cuenta para el posicionamiento.
 */
const VideoSection = () => {
  const { t } = useTranslation();
  const [reproduciendo, setReproduciendo] = useState(false);

  return (
    <section id="video" className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl font-light tracking-tight text-foreground sm:text-4xl">
          {t("video.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-base font-light leading-relaxed text-muted-foreground">
          {t("video.lead")}
        </p>

        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-muted">
          <div className="relative aspect-video">
            {reproduciendo ? (
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={t("video.title")}
                className="absolute inset-0 h-full w-full border-0"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setReproduciendo(true)}
                className="group absolute inset-0 h-full w-full"
                aria-label={t("video.play")}
              >
                <img
                  src={POSTER}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute inset-0 bg-[rgba(22,36,79,0.35)] transition-colors group-hover:bg-[rgba(22,36,79,0.25)]" />
                <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/95 shadow-sm transition-transform group-hover:scale-105">
                  <Play className="ml-1 h-6 w-6 text-primary" strokeWidth={1.5} />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-4 text-center text-sm font-light text-white">
                  {t("video.play")}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
