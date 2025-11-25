import { 
  Wifi, 
  ParkingCircle, 
  Trees, 
  Flame, 
  Snowflake, 
  MapPin,
  Waves,
  UtensilsCrossed,
  Tv,
  WashingMachine,
  Bath,
  Coffee
} from "lucide-react";
import { useTranslation } from "react-i18next";

const AmenitiesSection = () => {
  const { t } = useTranslation();
  const amenities = [
    {
      icon: Trees,
      title: t('amenities.garden'),
      description: t('amenities.gardenDesc'),
    },
    {
      icon: Snowflake,
      title: t('amenities.ac'),
      description: t('amenities.acDesc'),
    },
    {
      icon: Waves,
      title: t('amenities.pool'),
      description: t('amenities.poolDesc'),
    },
    {
      icon: MapPin,
      title: t('amenities.location'),
      description: t('amenities.locationDesc'),
    },
    {
      icon: Wifi,
      title: t('amenities.wifi'),
      description: t('amenities.wifiDesc'),
    },
    {
      icon: UtensilsCrossed,
      title: t('amenities.kitchen'),
      description: t('amenities.kitchenDesc'),
    },
    {
      icon: Tv,
      title: t('amenities.entertainment'),
      description: t('amenities.entertainmentDesc'),
    },
    {
      icon: Coffee,
      title: t('amenities.outdoor'),
      description: t('amenities.outdoorDesc'),
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light tracking-tight text-foreground mb-6">
            {t('amenities.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            {t('amenities.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-5 shadow-sm border border-border hover:border-primary/30 transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <amenity.icon size={20} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-light text-foreground text-base mb-1">
                    {amenity.title}
                  </h3>
                  <p className="text-muted-foreground text-xs font-light">
                    {amenity.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
