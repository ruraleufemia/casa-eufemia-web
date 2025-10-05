import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const Lightbox = ({ images, currentIndex, onClose, onNavigate }: LightboxProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const handlePrevious = () => {
    onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center animate-fade-in">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-card/80 hover:bg-card text-foreground flex items-center justify-center transition-colors z-50"
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 w-12 h-12 rounded-full bg-card/80 hover:bg-card text-foreground flex items-center justify-center transition-colors z-50"
        aria-label="Previous image"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Image */}
      <div className="relative max-w-7xl max-h-[90vh] mx-4 animate-scale-in">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />
        
        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/90 px-4 py-2 rounded-full text-foreground font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-4 w-12 h-12 rounded-full bg-card/80 hover:bg-card text-foreground flex items-center justify-center transition-colors z-50"
        aria-label="Next image"
      >
        <ChevronRight size={28} />
      </button>

      {/* Background Click to Close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-label="Close lightbox"
      />
    </div>
  );
};

export default Lightbox;
