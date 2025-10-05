import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import GalleryPreview from "@/components/GalleryPreview";
import AmenitiesSection from "@/components/AmenitiesSection";
import TourismSection from "@/components/TourismSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      <GalleryPreview />
      <AmenitiesSection />
      <TourismSection />
      <Footer />
    </div>
  );
};

export default Index;
