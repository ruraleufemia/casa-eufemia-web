import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
        <Hero />
        <AboutSection />
        <LocalSeoSection />
        <GalleryPreview />
        <VideoSection />
        <AmenitiesSection />
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
