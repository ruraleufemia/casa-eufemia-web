import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import LocalSeoSection from "@/components/LocalSeoSection";
import GalleryPreview from "@/components/GalleryPreview";
import AmenitiesSection from "@/components/AmenitiesSection";
import BlogPreview from "@/components/BlogPreview";
import FaqSection from "@/components/FaqSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import WhatsAppButton from "@/components/WhatsAppButton";
import { usePageSeo } from "@/hooks/usePageSeo";

const Index = () => {
  const seo = usePageSeo("home");
  const videoUrl = "https://www.youtube.com/embed/iUC5-n8IP-Q?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=iUC5-n8IP-Q";
  
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
        <Hero 
          useVideo={true}
          isYouTube={true}
          videoUrl={videoUrl}
        />
        <AboutSection />
        <LocalSeoSection />
        <GalleryPreview />
        <AmenitiesSection />
        <BlogPreview />
        <FaqSection />
        <ReviewsSection />
        <ContactForm />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
