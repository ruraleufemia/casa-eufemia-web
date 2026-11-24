import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import esLocale from "@/i18n/locales/es.json";
import enLocale from "@/i18n/locales/en.json";

const SITE_URL = "https://www.casaeufemia.com";
export const DOGS_SLUG = "casa-rural-que-admite-perros";

interface DogsCopy {
  breadcrumb: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  h1: string;
  lead: string;
  intro: string;
  rulesTitle: string;
  bullets: string[];
  walksTitle: string;
  walks: string;
  tip: string;
  faqs: { question: string; answer: string }[];
}

const DogFriendly = () => {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language?.startsWith("en");
  const copy = ((isEnglish ? enLocale : esLocale) as unknown as { dogs: DogsCopy }).dogs;
  const url = `/${DOGS_SLUG}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("nav.home"), item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: copy.breadcrumb, item: `${SITE_URL}${url}` },
    ],
  };

  return (
    <>
      <SEO
        title={copy.seoTitle}
        description={copy.seoDescription}
        keywords={copy.seoKeywords}
        url={url}
        image="/maya-piscina-casa-rural-perros.webp"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen">
        <Navbar />

        <header className="relative">
          <img
            src="/maya-piscina-casa-rural-perros.webp"
            alt="Maya, la perra de la casa, junto a la piscina privada de Casa Rural Eufemia"
            width={1400}
            height={934}
            fetchpriority="high"
            className="h-[52vh] max-h-[560px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8">
              <nav aria-label="breadcrumb" className="mb-3 text-sm text-white/80">
                <Link to="/" className="underline-offset-4 hover:underline">
                  {t("nav.home")}
                </Link>
                <span className="mx-2">›</span>
                <span>{copy.breadcrumb}</span>
              </nav>
              <h1 className="font-display text-3xl font-light tracking-tight text-white sm:text-4xl lg:text-5xl">
                {copy.h1}
              </h1>
              <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-white/90 sm:text-lg">
                {copy.lead}
              </p>
            </div>
          </div>
        </header>

        <main>
          <section className="py-14 sm:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <p className="text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
                {copy.intro}
              </p>

              <h2 className="mt-12 mb-6 font-display text-2xl font-light text-foreground sm:text-3xl">
                {copy.rulesTitle}
              </h2>
              <ul className="space-y-3">
                {copy.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 font-light leading-relaxed text-muted-foreground"
                  >
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
                <img
                  src="/maya-cesped-casa-rural-perros.webp"
                  alt="Maya tumbada en el césped del jardín cerrado de la casa rural"
                  width={1000}
                  height={1333}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-xl object-cover"
                />
                <img
                  src="/maya-patio-casa-rural-perros.webp"
                  alt="Maya descansando en el patio de Casa Rural Eufemia"
                  width={1000}
                  height={1500}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>

              <h2 className="mt-12 mb-4 font-display text-2xl font-light text-foreground sm:text-3xl">
                {copy.walksTitle}
              </h2>
              <p className="text-base font-light leading-relaxed text-muted-foreground">
                {copy.walks}
              </p>

              <aside className="mt-10 rounded-xl border border-border bg-accent p-6 sm:p-7">
                <p className="mb-2 text-sm tracking-[0.2em] text-primary">{t("nearby.tipTitle")}</p>
                <p className="font-light leading-relaxed text-muted-foreground">{copy.tip}</p>
              </aside>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/pricing">
                  <Button className="font-light">{t("nearby.checkAvailability")}</Button>
                </Link>
                <Link to="/gallery">
                  <Button variant="outline" className="font-light">
                    {t("nearby.seeHouse")}
                  </Button>
                </Link>
              </div>

              <h2 className="mt-14 mb-6 font-display text-2xl font-light text-foreground sm:text-3xl">
                {t("nearby.faqTitle")}
              </h2>
              <div className="space-y-4">
                {copy.faqs.map((faq) => (
                  <details key={faq.question} className="group rounded-lg border border-border bg-card p-5">
                    <summary className="cursor-pointer list-none font-light text-foreground marker:hidden">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <ContactForm />
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default DogFriendly;
