import heroImage from "@/assets/hero-house.jpg";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Casa Eufemia - Casa Rural en Arenales de San Gregorio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/30 to-foreground/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-display font-light tracking-tight text-primary-foreground mb-8 drop-shadow-2xl">
          Casa Eufemia
        </h1>
        <div className="w-16 h-px bg-primary-foreground/60 mx-auto mb-8"></div>
        <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 font-light tracking-wide drop-shadow-lg">
          Arenales de San Gregorio, Ciudad Real
        </p>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60 hover:text-primary-foreground transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} strokeWidth={1.5} />
      </button>
    </section>
  );
};

export default Hero;
