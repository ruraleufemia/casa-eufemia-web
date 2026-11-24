import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GoogleRatingBar from "@/components/GoogleRatingBar";
import HouseFacts from "@/components/HouseFacts";
import DirectBooking from "@/components/DirectBooking";
import AboutSection from "@/components/AboutSection";
import LocalSeoSection from "@/components/LocalSeoSection";
import GalleryPreview from "@/components/GalleryPreview";
import VideoSection from "@/components/VideoSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import FaqSection from "@/components/FaqSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import WhatsAppButton from "@/components/WhatsAppButton";
import { usePageSeo } from "@/hooks/usePageSeo";

/**
 * Orden de la portada, pensado como una conversación con quien entra:
 *   la nota de Google (puedes confiar) → la piscina (esto es lo que hay)
 *   → los datos (cabemos todos) → la reserva directa (por qué conmigo)
 *   → quién soy → las fotos → lo que tiene la casa → el vídeo
 *   → qué ver cerca → dudas → reseñas → escríbeme.
 */
const Index = () => {
  const seo = usePageSeo("home");
  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        url="/"
        keywords={seo.keywords}
      />
      <div className="min-h-screen">
        <Navbar />
        <main>
          <GoogleRatingBar />
          <Hero />
          <HouseFacts />
          <DirectBooking />
          <AboutSection />
          <GalleryPreview />
          <AmenitiesSection />
          <VideoSection />
          <LocalSeoSection />
          <FaqSection />
          <ReviewsSection />
          <ContactForm />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
