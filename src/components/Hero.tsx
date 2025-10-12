import heroImage from "@/assets/hero-house.jpg";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  videoUrl?: string;
  useVideo?: boolean;
}

const Hero = ({ videoUrl, useVideo = false }: HeroProps) => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Media with Overlay */}
      <div className="absolute inset-0">
        {useVideo && videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
            poster={heroImage}
          >
            <source src={videoUrl} type="video/mp4" />
            <img
              src={heroImage}
              alt="Casa Eufemia - Casa Rural en Arenales de San Gregorio"
              className="w-full h-full object-cover"
            />
          </video>
        ) : (
          <img
            src={heroImage}
            alt="Casa Eufemia - Casa Rural en Arenales de San Gregorio"
            className="w-full h-full object-cover scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto animate-fade-in">
        <h1 className="text-7xl sm:text-8xl lg:text-9xl font-display font-extralight tracking-wider text-white mb-6 drop-shadow-2xl leading-none">
          Casa Eufemia
        </h1>
        <div className="w-24 h-[1px] bg-white/40 mx-auto mb-6"></div>
        <p className="text-xl sm:text-2xl lg:text-3xl text-white/95 font-light tracking-widest drop-shadow-lg uppercase text-sm">
          Arenales de San Gregorio
        </p>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-all duration-300 animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={40} strokeWidth={1} />
      </button>
    </section>
  );
};

export default Hero;
