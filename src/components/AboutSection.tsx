import { Home, Users, Bed, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language?.startsWith("en");
  const copy = isEnglish
    ? {
        heading: "A home in La Mancha to enjoy together",
        paragraphs: [
          "At Casa Rural Eufemia, you have the whole house to yourselves: unhurried breakfasts, meals outdoors and time together in a peaceful corner of La Mancha.",
          "The house is all on one floor, with three bedrooms, a La Mancha-style living and dining room, and an equipped kitchen. Outside, the patio, garden, barbecue and private pool invite you to enjoy each moment at your own pace.",
          "We are in Arenales de San Gregorio, Ciudad Real, near Tomelloso and Campo de Criptana. I'm Silvia, your host, and I'll be delighted to help you plan your getaway.",
        ],
        signoff: "Casa Rural Eufemia. Where memories begin.",
        photoAlt: "Silvia, host of Casa Rural Eufemia, holding her dog Maya in the patio",
        photoCaption: "Silvia and Maya welcome you",
      }
    : {
        heading: "Un hogar manchego para disfrutar juntos",
        paragraphs: [
          "En Casa Rural Eufemia tienes la casa completa para ti y los tuyos: desayunos sin prisas, comidas al aire libre y tiempo para compartir en un entorno tranquilo de La Mancha.",
          "La vivienda se distribuye en una sola planta, con tres dormitorios, salón comedor de estilo manchego y cocina equipada. En el exterior, el patio, el jardín, la barbacoa y la piscina privada invitan a disfrutar de cada momento a vuestro ritmo.",
          "Estamos en Arenales de San Gregorio, Ciudad Real, cerca de Tomelloso y Campo de Criptana. Soy Silvia, tu anfitriona, y estaré encantada de ayudarte a preparar la escapada.",
        ],
        signoff: "Casa Eufemia. Donde nacen los recuerdos.",
        photoAlt: "Silvia, anfitriona de Casa Rural Eufemia, con su perra Maya en el patio",
        photoCaption: "Silvia y Maya te dan la bienvenida",
      };

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
              {copy.heading}
            </h3>
            <div className="space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground font-light">
              {copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <p className="mt-7 text-lg font-display text-foreground">{copy.signoff}</p>
          </div>

          <figure className="order-first lg:order-last overflow-hidden rounded-xl bg-muted shadow-sm border border-border animate-fade-in">
            <img
              src="/silvia-maya-bienvenida-casa-rural-eufemia.jpg"
              alt={copy.photoAlt}
              width={1016}
              height={1548}
              loading="lazy"
              decoding="async"
              className="w-full h-[420px] sm:h-[540px] lg:h-[640px] object-cover object-center"
            />
            <figcaption className="px-5 py-3 text-sm text-muted-foreground">{copy.photoCaption}</figcaption>
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
