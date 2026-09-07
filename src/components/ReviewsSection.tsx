import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";

const GOOGLE_MAPS_REVIEW_URL = "https://www.google.com/maps/search/?api=1&query=Casa+Eufemia,+Calle+Juan+José+Jiménez+4,+13619+Arenales+de+San+Gregorio,+Ciudad+Real,+España";
const GOOGLE_MAPS_EMBED_URL = "https://maps.google.com/maps?q=Calle+Juan+José+Jiménez+4,+13619+Arenales+de+San+Gregorio,+Ciudad+Real,+España&output=embed";

const ReviewsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-4">
            {t("reviews.title")}
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-primary text-primary" />
            ))}
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("reviews.subtitle")}
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <iframe
              src={GOOGLE_MAPS_EMBED_URL}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("reviews.iframeTitle")}
              className="w-full"
            />
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-4">
            {t("reviews.ctaText")}{" "}
          </p>
          <a
            href={GOOGLE_MAPS_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            <Star className="w-5 h-5 fill-current" />
            {t("reviews.ctaLink")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
