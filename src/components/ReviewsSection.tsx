import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ReviewsSection = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-4">
            Lo que dicen nuestros huéspedes
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-primary text-primary" />
            ))}
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Lee las opiniones de quienes ya han disfrutado de Casa Eufemia
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3073.8333333333335!2d-3.5833333333333335!3d39.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDMwJzAwLjAiTiAzwrAzNScwMC4wIlc!5e0!3m2!1ses!2ses!4v1234567890123!5m2!1ses!2ses"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Casa Eufemia - Reseñas de Google Maps"
              className="w-full"
            />
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            ¿Ya te has alojado con nosotros?{" "}
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Déjanos tu reseña en Google
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
