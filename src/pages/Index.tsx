import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import GalleryPreview from "@/components/GalleryPreview";
import AmenitiesSection from "@/components/AmenitiesSection";
import BlogPreview from "@/components/BlogPreview";
import ReviewsSection from "@/components/ReviewsSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import WhatsAppButton from "@/components/WhatsAppButton";
import { usePageSeo } from "@/hooks/usePageSeo";

const Index = () => {
  const seo = usePageSeo("home");
  const videoUrl = "https://www.youtube.com/embed/iUC5-n8IP-Q?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&vq=hd1080&quality=hd1080";
  
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
        <GalleryPreview />
        <AmenitiesSection />
        <BlogPreview />
        {/* <ReviewsSection /> */}
        <ContactForm />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
