import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import GalleryPreview from "@/components/GalleryPreview";
import AmenitiesSection from "@/components/AmenitiesSection";
import BlogPreview from "@/components/BlogPreview";
import TourismSection from "@/components/TourismSection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  // Video de ejemplo de una casa rural
  const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  
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
          videoUrl={videoUrl}
        />
        <AboutSection />
        <GalleryPreview />
        <AmenitiesSection />
        <BlogPreview />
        <TourismSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
