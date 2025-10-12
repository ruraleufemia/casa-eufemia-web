import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import GalleryPreview from "@/components/GalleryPreview";
import AmenitiesSection from "@/components/AmenitiesSection";
import BlogPreview from "@/components/BlogPreview";
import TourismSection from "@/components/TourismSection";
import Footer from "@/components/Footer";

const Index = () => {
  // Video de ejemplo - puedes reemplazarlo con tu propio video
  const videoUrl = "https://videos.pexels.com/video-files/5752729/5752729-uhd_2560_1440_25fps.mp4";
  
  return (
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
  );
};

export default Index;
