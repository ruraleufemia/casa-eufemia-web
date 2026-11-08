import { useEffect, useState } from "react";
import { Home, Users, Bed, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { resolveMediaUrl } from "@/lib/media";

const AboutSection = () => {
  const { t } = useTranslation();
  const imagePath = t("about.welcomeImage");
  const [imageUrl, setImageUrl] = useState(imagePath);

  useEffect(() => {
    let active = true;
    resolveMediaUrl(imagePath).then((url) => {
      if (active) setImageUrl(url);
    });
    return () => { active = false; };
  }, [imagePath]);

  const features = [
    { icon: Home, title: "290m²", description: t("about.space") },
    { icon: Users, title: t("about.capacity"), description: t("about.maxCapacity") },
    { icon: Bed, title: t("about.bedrooms"), description: t("about.comfortableBedrooms") },
    { icon: MapPin, title: t("about.location"), description: t("about.inTheHeart") },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-display font-light tracking-tight text-foreground mb-12">
          {t("about.title")}
        </h2>

        <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-16 mb-16">
          <div className="order-last lg:order-first animate-fade-in">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-light tracking-tight text-foreground mb-7">
              {t("about.welcomeHeading")}
            </h3>
            <div className="space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground font-light">
              {["welcomeP1", "welcomeP2", "welcomeP3"].map((key) => (
                <p key={key}>{t(`about.${key}`)}</p>
              ))}
            </div>
            <p className="mt-7 text-lg font-display text-foreground">{t("about.welcomeSignoff")}</p>
          </div>

          <figure className="order-first lg:order-last overflow-hidden rounded-xl bg-muted shadow-sm border border-border animate-fade-in">
            <img
              src={imageUrl}
              alt={t("about.welcomeImageAlt")}
              width={1016}
              height={1548}
              loading="lazy"
              decoding="async"
              className="w-full h-[420px] sm:h-[540px] lg:h-[640px] object-cover object-center"
            />
            <figcaption className="px-5 py-3 text-sm text-muted-foreground">{t("about.welcomeImageCaption")}</figcaption>
          </figure>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/5 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <feature.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-display font-light text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground font-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
