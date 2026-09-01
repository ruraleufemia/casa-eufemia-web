import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import SEO from "@/components/SEO";
import { useGalleryImages } from "@/hooks/useGalleryImages";

const Gallery = () => {
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dbImages = useGalleryImages();

  const baseImages = [

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
      { src: "/nuevasfotoscasa/IMG-20260530-WA0001.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0003.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0005.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0006.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0007.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0008.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0009.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0010.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0011.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0012.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0013.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0014.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0015.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0016.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0017.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0018.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0019.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0020.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0021.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0022.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0024.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0025.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0027.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0029.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0030.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0031.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0032.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0033.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0034.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0035.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0036.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0037.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0038.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0039.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0040.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0041.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0042.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0043.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0044.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0045.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0046.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0047.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0048.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0050.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0051.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0052.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0053.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0054.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0055.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0056.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0057.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0058.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0059.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0060.jpg", altKey: "newPhoto" },
      { src: "/nuevasfotoscasa/IMG-20260530-WA0061.jpg", altKey: "newPhoto" },
  ];

  const images = [
    ...baseImages.map((img) => ({ src: img.src, alt: t(`galleryPage.images.${img.altKey}`) })),
    ...dbImages,
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
                      alt={image.alt}
                      loading="lazy"
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
    </>
  );
};

export default Gallery;
