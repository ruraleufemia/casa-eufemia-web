import { MapPin, Castle, Mountain, Wine, Church, Landmark } from "lucide-react";

const TourismSection = () => {
  const attractions = [
    {
      icon: Castle,
      name: "Almagro",
      distance: "90 km",
      description: "Ciudad histórica con el famoso Corral de Comedias, teatro del siglo XVII perfectamente conservado.",
    },
    {
      icon: Landmark,
      name: "Campo de Criptana",
      distance: "13 km",
      description: "Los icónicos molinos de viento inmortalizados por Cervantes en Don Quijote de la Mancha.",
    },
    {
      icon: Mountain,
      name: "Parque Nacional de las Tablas de Daimiel",
      distance: "90 km",
      description: "Humedal único en Europa, ideal para observación de aves y naturaleza.",
    },
    {
      icon: Wine,
      name: "Ruta del Vino de La Mancha",
      distance: "Varios puntos",
      description: "Descubre las bodegas locales y degusta los excelentes vinos manchegos con Denominación de Origen.",
    },
    {
      icon: MapPin,
      name: "Parque Natural Lagunas de Ruidera",
      distance: "60 km",
      description: "Impresionante sistema de 15 lagunas de agua turquesa, ideal para senderismo y deportes acuáticos.",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light tracking-tight text-foreground mb-6">
            Explora La Mancha
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Atractivos cercanos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-6 shadow-sm border border-border hover:border-primary/30 transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <attraction.icon size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-display font-light text-foreground">
                    {attraction.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-light">
                    {attraction.distance}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">
                {attraction.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-card rounded-xl p-8 sm:p-12 shadow-sm border border-border text-center animate-scale-in">
          <h3 className="text-2xl sm:text-3xl font-display font-light tracking-tight text-foreground mb-6">
            La Tierra de Don Quijote
          </h3>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Casa Eufemia es el punto de partida perfecto para explorar la región que inspiró 
            a Cervantes. Desde los molinos de viento hasta las bodegas centenarias, cada rincón 
            de La Mancha cuenta una historia.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TourismSection;
