import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import SEO from "@/components/SEO";
import { galleryImages, type GalleryCategory } from "@/data/galleryImages";
import { useGalleryImages } from "@/hooks/useGalleryImages";
import { usePageSeo } from "@/hooks/usePageSeo";

type GalleryFilter = "all" | GalleryCategory;

const galleryFilters: { translationKey: string; value: GalleryFilter }[] = [
  { value: "all", translationKey: "all" },
  { value: "exterior", translationKey: "exterior" },
  { value: "pool", translationKey: "pool" },
  { value: "interior", translationKey: "interior" },
  { value: "rooms", translationKey: "rooms" },
  { value: "experiences", translationKey: "experiences" },
  { value: "details", translationKey: "details" },
];

const Gallery = () => {
  const { t } = useTranslation();
  const seo = usePageSeo("gallery");
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dbImages = useGalleryImages();

  const images = activeFilter === "all"
    ? [...galleryImages, ...dbImages]
    : galleryImages.filter((image) => image.category === activeFilter);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        url="/gallery"
        keywords={seo.keywords}
        image="/galeria/casa-rural-piscina-privada-ciudad-real.jpg"
      />
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 pt-20">
          <section className="bg-card border-b border-border py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light tracking-tight text-foreground mb-6 animate-fade-in">
                {t("galleryPage.title")}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in font-light">
                {t("galleryPage.subtitle")}
              </p>
            </div>
          </section>

          <section className="py-12 sm:py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-10 flex flex-col items-center gap-4">
                <div
                  aria-label={t("galleryPage.filterLabel")}
                  className="flex max-w-full flex-wrap justify-center gap-2"
                  role="group"
                >
                  {galleryFilters.map((filter) => (
                    <button
                      aria-pressed={activeFilter === filter.value}
                      className={[
                        "rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        activeFilter === filter.value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-primary hover:text-primary",
                      ].join(" ")}
                      key={filter.value}
                      onClick={() => setActiveFilter(filter.value)}
                      type="button"
                    >
                      {t("galleryPage.filters." + filter.translationKey)}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("galleryPage.photoCount", { count: images.length })}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((image, index) => (
                  <button
                    aria-label={t("galleryPage.openImage", { description: image.alt })}
                    className="group relative overflow-hidden rounded-xl text-left shadow-lg transition-all duration-300 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    key={image.src}
                    onClick={() => openLightbox(index)}
                    type="button"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        alt={image.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        decoding="async"
                        loading="lazy"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        src={image.src}
                      />
                    </div>
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <p className="p-4 text-sm font-light text-primary-foreground">
                        {image.alt}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />

        {lightboxOpen && (
          <Lightbox
            currentIndex={currentImageIndex}
            images={images}
            onClose={() => setLightboxOpen(false)}
            onNavigate={setCurrentImageIndex}
          />
        )}
      </div>
    </>
  );
};

export default Gallery;
