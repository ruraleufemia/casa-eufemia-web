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

const AmenitiesSection = () => {
  const amenities = [
    {
      icon: ParkingCircle,
      title: "Parking privado",
      description: "Amplio aparcamiento para varios vehículos",
    },
    {
      icon: Trees,
      title: "Jardín extenso",
      description: "Espacios verdes con olivos y plantas autóctonas",
    },
    {
      icon: Flame,
      title: "Calefacción",
      description: "Sistema de calefacción en toda la casa",
    },
    {
      icon: Snowflake,
      title: "Aire acondicionado",
      description: "Climatización en todas las habitaciones",
    },
    {
      icon: Waves,
      title: "Piscina privada",
      description: "Piscina exterior para uso exclusivo",
    },
    {
      icon: MapPin,
      title: "Ubicación tranquila",
      description: "Entorno rural y pacífico",
    },
    {
      icon: Wifi,
      title: "WiFi gratuito",
      description: "Internet de alta velocidad",
    },
    {
      icon: UtensilsCrossed,
      title: "Cocina equipada",
      description: "Completamente equipada con electrodomésticos",
    },
    {
      icon: Tv,
      title: "TV y entretenimiento",
      description: "Smart TV en salón",
    },
    {
      icon: WashingMachine,
      title: "Lavadora",
      description: "Zona de lavandería equipada",
    },
    {
      icon: Bath,
      title: "3 baños completos",
      description: "Baños modernos y bien equipados",
    },
    {
      icon: Coffee,
      title: "Zona exterior",
      description: "Pérgola, barbacoa y mobiliario de jardín",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-primary mb-4">
            Comodidades y Servicios
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Todo lo que necesitas para una estancia perfecta
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 animate-fade-in group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <amenity.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg mb-1">
                    {amenity.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
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
