import heroImage from "@/assets/hero-house.jpg";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface HeroProps {
  videoUrl?: string;
  useVideo?: boolean;
  isYouTube?: boolean;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const Hero = ({ videoUrl, useVideo = false, isYouTube = false }: HeroProps) => {
  const { t } = useTranslation();
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isYouTube || !videoUrl) return;

    // Extract video ID from URL
    const videoId = videoUrl.split('/embed/')[1]?.split('?')[0];
    if (!videoId) return;

    const createPlayer = () => {
      const el = document.getElementById('youtube-player');
      if (!el || !window.YT || !window.YT.Player) return;
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            event.target.setPlaybackQuality('hd1080');
            event.target.mute();
            event.target.playVideo();
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      // Load API only once
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prev === 'function') prev();
        createPlayer();
      };
    }

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try { playerRef.current.destroy(); } catch (_) {}
        playerRef.current = null;
      }
    };
  }, [isYouTube, videoUrl]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0">
        {useVideo && videoUrl ? (
          isYouTube ? (
            <div ref={containerRef} className="absolute inset-0 w-full h-full">
              <div
                id="youtube-player"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh]"
              />
            </div>
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
                alt="Casa Eufemia - Casa Rural en Arenales de San Gregorio"
                className="w-full h-full object-cover"
              />
            </video>
          )
        ) : (
          <img
            src={heroImage}
            alt="Casa Eufemia - Casa Rural en Arenales de San Gregorio"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-all duration-300 animate-bounce z-10"
        aria-label={t('hero.scrollDown')}
      >
        <ChevronDown size={40} strokeWidth={1} />
      </button>
    </section>
  );
};

export default Hero;
