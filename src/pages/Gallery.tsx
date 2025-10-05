import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import heroImage from "@/assets/hero-house.jpg";
import livingRoom from "@/assets/living-room.jpg";
import bedroom from "@/assets/bedroom.jpg";
import kitchen from "@/assets/kitchen.jpg";
import pool from "@/assets/pool.jpg";
import patio from "@/assets/patio.jpg";
import garden from "@/assets/garden.jpg";
import exteriorFacade from "@/assets/exterior-facade.jpg";
import terrace from "@/assets/terrace.jpg";

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { src: heroImage, alt: "Casa Eufemia - Exterior principal" },
    { src: exteriorFacade, alt: "Fachada de la casa" },
    { src: livingRoom, alt: "Salón con chimenea" },
    { src: bedroom, alt: "Dormitorio principal" },
    { src: kitchen, alt: "Cocina rústica moderna" },
    { src: pool, alt: "Piscina exterior" },
    { src: patio, alt: "Patio con pérgola" },
    { src: garden, alt: "Jardín con olivos" },
    { src: terrace, alt: "Terraza exterior" },
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header */}
        <section className="bg-card border-b border-border py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light tracking-tight text-foreground mb-6 animate-fade-in">
              Galería
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in font-light">
              Cada detalle de tu próximo refugio
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4">
                      <p className="text-primary-foreground text-sm font-light">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setCurrentImageIndex}
        />
      )}
    </div>
  );
};

export default Gallery;
