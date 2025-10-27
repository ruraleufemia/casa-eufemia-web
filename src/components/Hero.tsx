import heroImage from "@/assets/hero-house.jpg";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  videoUrl?: string;
  useVideo?: boolean;
  isYouTube?: boolean;
}

const Hero = ({ videoUrl, useVideo = false, isYouTube = false }: HeroProps) => {
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
            <div className="absolute inset-0 w-full h-full">
              <iframe
                src={videoUrl}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none', pointerEvents: 'none' }}
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
        aria-label="Scroll down"
      >
        <ChevronDown size={40} strokeWidth={1} />
      </button>
    </section>
  );
};

export default Hero;
