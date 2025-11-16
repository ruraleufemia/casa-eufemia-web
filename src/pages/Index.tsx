import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import GalleryPreview from "@/components/GalleryPreview";
import AmenitiesSection from "@/components/AmenitiesSection";
import BlogPreview from "@/components/BlogPreview";
import TourismSection from "@/components/TourismSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  const videoUrl = "https://www.youtube.com/embed/iUC5-n8IP-Q?autoplay=1&mute=1&loop=1&playlist=iUC5-n8IP-Q&controls=0&modestbranding=1&rel=0&showinfo=0&vq=hd1080&quality=hd1080";
  
  return (
    <>
      <SEO 
        url="/"
        keywords="casa rural Ciudad Real, casaeufemia, casa eufemia, alojamiento rural La Mancha, casa con piscina Ciudad Real, turismo rural Arenales de San Gregorio, vacaciones rurales España, casa rural lujo, alquiler casa rural, escapada rural Ciudad Real"
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
        <TourismSection />
        {/* <ReviewsSection /> */}
        <ContactForm />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
