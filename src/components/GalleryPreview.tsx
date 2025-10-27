import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const GalleryPreview = () => {
  const images = [
    { src: "/1. Fachada.jpg", alt: "Fachada de Casa Eufemia", title: "Fachada" },
    { src: "/2. Barbacoa.jpg", alt: "Zona de barbacoa", title: "Barbacoa" },
    { src: "/3. Salon.jpg", alt: "Salón principal", title: "Salón" },
    { src: "/4. Cuarto 2.jpg", alt: "Dormitorio 2", title: "Dormitorio" },
    { src: "/5. Picoteo.jpg", alt: "Mesa de picoteo", title: "Picoteo" },
    { src: "/6. Piscina.jpg", alt: "Piscina exterior", title: "Piscina" },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light tracking-tight text-foreground mb-6">
            Galería
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Descubre cada rincón
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6">
                  <h3 className="text-primary-foreground text-lg font-display font-light tracking-wide">
                    {image.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/gallery">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground group font-light"
            >
              Ver más
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} strokeWidth={1.5} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
