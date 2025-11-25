import { Home, Users, Bed, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: Home,
      title: "290m²",
      description: t('about.space'),
    },
    {
      icon: Users,
      title: t('about.capacity'),
      description: t('about.maxCapacity'),
    },
    {
      icon: Bed,
      title: t('about.bedrooms'),
      description: t('about.comfortableBedrooms'),
    },
    {
      icon: MapPin,
      title: t('about.location'),
      description: t('about.inTheHeart'),
    },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light tracking-tight text-foreground mb-6">
            {t('about.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/5 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <feature.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-display font-light text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground font-light">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-border p-8 sm:p-12 animate-scale-in">
          <h3 className="text-2xl sm:text-3xl font-display font-light tracking-tight text-foreground mb-8">
            {t('about.architectureTitle')}
          </h3>
          <div className="space-y-6 text-muted-foreground text-base leading-relaxed font-light">
            <p>
              {t('about.architectureP1')}
            </p>
            <p>
              {t('about.architectureP2')}
            </p>
            <p>
              {t('about.architectureP3')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
