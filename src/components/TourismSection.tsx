import { MapPin, Castle, Mountain, Wine, Church, Landmark } from "lucide-react";

const TourismSection = () => {
  const attractions = [
    {
      icon: Castle,
      name: "Almagro",
      distance: "45 km",
      description: "Ciudad histórica con el famoso Corral de Comedias, teatro del siglo XVII perfectamente conservado.",
    },
    {
      icon: Landmark,
      name: "Campo de Criptana",
      distance: "35 km",
      description: "Los icónicos molinos de viento inmortalizados por Cervantes en Don Quijote de la Mancha.",
    },
    {
      icon: Mountain,
      name: "Parque Nacional de las Tablas de Daimiel",
      distance: "40 km",
      description: "Humedal único en Europa, ideal para observación de aves y naturaleza.",
    },
    {
      icon: Wine,
      name: "Ruta del Vino de La Mancha",
      distance: "Varios puntos",
      description: "Descubre las bodegas locales y degusta los excelentes vinos manchegos con Denominación de Origen.",
    },
    {
      icon: Church,
      name: "Ciudad Real Capital",
      distance: "25 km",
      description: "Centro histórico con la Puerta de Toledo, museos y amplia oferta gastronómica.",
    },
    {
      icon: MapPin,
      name: "Parque Natural Lagunas de Ruidera",
      distance: "90 km",
      description: "Impresionante sistema de 15 lagunas de agua turquesa, ideal para senderismo y deportes acuáticos.",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-primary mb-4">
            Explora La Mancha
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Atractivos turísticos cercanos que no puedes perderte
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <attraction.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground">
                    {attraction.name}
                  </h3>
                  <p className="text-sm text-secondary font-medium">
                    {attraction.distance}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {attraction.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-card rounded-2xl p-8 sm:p-12 shadow-xl text-center animate-scale-in">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-primary mb-4">
            La Tierra de Don Quijote
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Casa Eufemia es el punto de partida perfecto para explorar la región que inspiró 
            a Cervantes. Desde los molinos de viento hasta las bodegas centenarias, cada rincón 
            de La Mancha cuenta una historia. Disfruta de la gastronomía local, los paisajes 
            únicos y la hospitalidad manchega que te harán sentir como en casa.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TourismSection;
