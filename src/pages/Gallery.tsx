import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import SEO from "@/components/SEO";

const Gallery = () => {
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { src: "/1. Fachada.jpg", altKey: "facade" },
    { src: "/2. Barbacoa.jpg", altKey: "barbecue" },
    { src: "/3. Salon.jpg", altKey: "livingRoom" },
    { src: "/4. Cuarto 2.jpg", altKey: "bedroom2" },
    { src: "/5. Picoteo.jpg", altKey: "snackTable" },
    { src: "/6. Piscina.jpg", altKey: "pool" },
    { src: "/Bano 1.jpg", altKey: "bathroom" },
    { src: "/Cocina.jpg", altKey: "kitchen" },
    { src: "/Cuarto 3.jpg", altKey: "bedroom3" },
    { src: "/Cuarto principal.jpg", altKey: "masterBedroom" },
    { src: "/Detalle botellas.jpg", altKey: "wineDetail" },
    { src: "/Juegos de mesa.jpg", altKey: "boardGames" },
    { src: "/Pet friendly.jpg", altKey: "petFriendly" },
    { src: "/Picoteo 2.jpg", altKey: "snackArea" },
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <SEO 
        title={t('galleryPage.seoTitle')}
        description={t('galleryPage.seoDescription')}
        url="/gallery"
        keywords="fotos casa rural, galería casa eufemia, imágenes alojamiento rural, piscina casa rural, jardín casa rural Ciudad Real"
      />
      <div className="min-h-screen flex flex-col">
        <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header */}
        <section className="bg-card border-b border-border py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light tracking-tight text-foreground mb-6 animate-fade-in">
              {t('galleryPage.title')}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in font-light">
              {t('galleryPage.subtitle')}
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
                      alt={t(`galleryPage.images.${image.altKey}`)}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4">
                      <p className="text-primary-foreground text-sm font-light">
                        {t(`galleryPage.images.${image.altKey}`)}
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
          images={images.map(img => ({ src: img.src, alt: t(`galleryPage.images.${img.altKey}`) }))}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setCurrentImageIndex}
        />
      )}
      </div>
    </>
  );
};

export default Gallery;
