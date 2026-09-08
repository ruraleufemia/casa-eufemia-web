import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language?.startsWith("en");
  const copy = isEnglish
    ? {
        eyebrow: "Before booking",
        title: "Frequently asked questions about Casa Eufemia",
        subtitle: "Practical information for planning a rural getaway in Arenales de San Gregorio, Ciudad Real.",
        questions: [
          {
            question: "Where is Casa Eufemia?",
            answer: "Casa Eufemia is in Arenales de San Gregorio, Ciudad Real, in the heart of La Mancha. It is a good base for visiting Tomelloso, Campo de Criptana, the Don Quixote Route and the Lagunas de Ruidera.",
          },
          {
            question: "How many people can stay at the rural house?",
            answer: "The house can accommodate up to 8 people. It has three bedrooms and one full bathroom, with shared areas designed for families and friends to enjoy their stay together.",
          },
          {
            question: "Does the rural house have a private pool?",
            answer: "Yes. Casa Eufemia has a private outdoor pool for the exclusive use of guests staying at the property.",
          },
          {
            question: "Is it suitable for families and groups?",
            answer: "Yes. Its capacity for up to 8 people, three bedrooms and shared spaces make it a comfortable choice for families and groups wanting to enjoy La Mancha together.",
          },
          {
            question: "Is there a garden and barbecue?",
            answer: "Yes. Casa Eufemia's outdoor area includes a garden, dining area, outdoor furniture and a barbecue area.",
          },
          {
            question: "What can I visit near Arenales de San Gregorio?",
            answer: "During your stay you can plan visits to Tomelloso, the Campo de Criptana windmills, Argamasilla de Alba and the Lagunas de Ruidera, combining nature, gastronomy and La Mancha culture.",
          },
          {
            question: "How can I check availability and prices?",
            answer: "You can check availability and prices on the pricing page, via WhatsApp or by sending a booking request through the website contact form.",
          },
        ],
      }
    : {
        eyebrow: "Antes de reservar",
        title: "Preguntas frecuentes sobre Casa Eufemia",
        subtitle: "Información práctica para organizar una escapada rural en Arenales de San Gregorio, Ciudad Real.",
        questions: [
          {
            question: "¿Dónde está Casa Eufemia?",
            answer: "Casa Eufemia está en Arenales de San Gregorio, Ciudad Real, en el corazón de La Mancha. Es una buena base para conocer Tomelloso, Campo de Criptana, la Ruta del Quijote y las Lagunas de Ruidera.",
          },
          {
            question: "¿Para cuántas personas es la casa rural?",
            answer: "La casa tiene capacidad para hasta 8 personas. Dispone de tres dormitorios y un baño completo, con espacios comunes pensados para compartir la estancia en familia o con amigos.",
          },
          {
            question: "¿La casa rural tiene piscina privada?",
            answer: "Sí. Casa Eufemia cuenta con una piscina exterior privada de uso exclusivo para quienes se alojan en la vivienda.",
          },
          {
            question: "¿Es una casa rural adecuada para familias y grupos?",
            answer: "Sí. La capacidad de hasta 8 personas, los tres dormitorios y las zonas para reunirse hacen que sea una opción cómoda para familias y grupos que quieren disfrutar de La Mancha juntos.",
          },
          {
            question: "¿Hay jardín y barbacoa?",
            answer: "Sí. El exterior de Casa Eufemia incluye jardín, merendero, mobiliario para disfrutar al aire libre y zona de barbacoa.",
          },
          {
            question: "¿Qué se puede visitar cerca de Arenales de San Gregorio?",
            answer: "Durante la estancia puedes planificar visitas a Tomelloso, los molinos de Campo de Criptana, Argamasilla de Alba y las Lagunas de Ruidera, combinando naturaleza, gastronomía y cultura manchega.",
          },
          {
            question: "¿Cómo puedo consultar disponibilidad y precios?",
            answer: "Puedes consultar disponibilidad y precio desde la página de precios, por WhatsApp o enviando una solicitud de reserva desde el formulario de contacto de la web.",
          },
        ],
      };

  const questions = copy.questions;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: i18n.language?.startsWith("en") ? "en" : "es",
    mainEntity: questions.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <section
      id="preguntas-frecuentes"
      className="bg-background px-4 py-20 sm:py-24"
      aria-labelledby="faq-title"
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="mx-auto max-w-4xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {copy.eyebrow}
          </p>
          <h2
            id="faq-title"
            className="mb-5 font-display text-3xl font-light tracking-tight text-foreground sm:text-4xl"
          >
            {copy.title}
          </h2>
          <p className="text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
            {copy.subtitle}
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="rounded-2xl border border-border bg-card px-5 shadow-sm sm:px-8"
        >
          {questions.map(({ question, answer }, index) => (
            <AccordionItem key={question} value={`faq-${index}`} className="last:border-b-0">
              <AccordionTrigger className="gap-6 py-6 text-left font-display text-lg font-medium leading-snug text-foreground hover:no-underline sm:text-xl">
                {question}
              </AccordionTrigger>
              <AccordionContent className="max-w-3xl pb-6 text-base font-light leading-relaxed text-muted-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
