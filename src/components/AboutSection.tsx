import { Home, Users, Bed, MapPin } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Home,
      title: "250m²",
      description: "De espacio acogedor",
    },
    {
      icon: Users,
      title: "Hasta 8 personas",
      description: "Capacidad máxima",
    },
    {
      icon: Bed,
      title: "4 dormitorios",
      description: "Cómodas habitaciones",
    },
    {
      icon: MapPin,
      title: "Ubicación única",
      description: "En el corazón de La Mancha",
    },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-primary mb-4">
            Bienvenidos a Casa Eufemia
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Una casa rural de ensueño donde la tradición manchega se encuentra con el confort moderno. 
            Situada en el tranquilo pueblo de Arenales de San Gregorio, Casa Eufemia ofrece 
            el escenario perfecto para desconectar y disfrutar de la auténtica vida rural española.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-display font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl shadow-xl p-8 sm:p-12 animate-scale-in">
          <h3 className="text-3xl font-display font-bold text-primary mb-6">
            Arquitectura y Disposición
          </h3>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>
              Casa Eufemia combina magistralmente la arquitectura tradicional manchega con todas las 
              comodidades modernas. Sus gruesos muros de piedra mantienen una temperatura agradable 
              durante todo el año, mientras que las vigas de madera originales añaden un carácter 
              único e inconfundible.
            </p>
            <p>
              La casa se distribuye en una sola planta de 250m², ofreciendo amplios espacios luminosos 
              que incluyen un salón comedor con chimenea, una cocina totalmente equipada, cuatro 
              dormitorios dobles y tres baños completos. Los techos altos con vigas vistas y los 
              suelos de terracota crean una atmósfera cálida y acogedora.
            </p>
            <p>
              El exterior no se queda atrás: un extenso jardín con zona de piscina, áreas de descanso 
              sombreadas bajo pérgolas de madera, y múltiples rincones para disfrutar del clima 
              mediterráneo hacen de Casa Eufemia el lugar ideal para unas vacaciones inolvidables.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
