import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { nearbyTowns, type NearbyTown as Town } from "@/data/nearbyTowns";
import esLocale from "@/i18n/locales/es.json";
import enLocale from "@/i18n/locales/en.json";

interface NearbyCopy {
  breadcrumb: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  h1: string;
  lead: string;
  intro: string;
  whyTitle: string;
  bullets: string[];
  whatToSeeTitle: string;
  whatToSee: string;
  tip: string;
  faqs: { question: string; answer: string }[];
}

const SITE_URL = "https://www.casaeufemia.com";

const NearbyTown = ({ town }: { town: Town }) => {
  const { t, i18n } = useTranslation();
  const url = `/${town.slug}`;
  const isEnglish = i18n.language?.startsWith("en");
  const otherTowns = nearbyTowns.filter((other) => other.slug !== town.slug);

  const allCopy = (isEnglish ? enLocale : esLocale).nearby as unknown as Record<string, NearbyCopy>;
  const copy = allCopy[town.key];
  const bullets = copy?.bullets ?? [];
  const faqs = copy?.faqs ?? [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
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
        image={town.image}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen">
        <Navbar />

        <header className="relative">
          <img
            src={town.image}
            alt={town.imageAlt}
            width={1600}
            height={900}
            className="h-[52vh] max-h-[560px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14">
              <nav aria-label="breadcrumb" className="mb-3 text-sm text-white/80">
                <Link to="/" className="hover:underline underline-offset-4">
                  {t("nav.home")}
                </Link>
                <span className="mx-2">›</span>
                <span>{copy.breadcrumb}</span>
              </nav>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white">
                {copy.h1}
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg font-light leading-relaxed text-white/90">
                {copy.lead}
              </p>
            </div>
          </div>
        </header>

        <main>
          <section className="py-14 sm:py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-base sm:text-lg font-light leading-relaxed text-muted-foreground">
                {copy.intro}
              </p>

              <h2 className="mt-12 mb-6 font-display text-2xl sm:text-3xl font-light text-foreground">
                {copy.whyTitle}
              </h2>
              <ul className="space-y-3">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-muted-foreground font-light leading-relaxed">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <h2 className="mt-12 mb-4 font-display text-2xl sm:text-3xl font-light text-foreground">
                {copy.whatToSeeTitle}
              </h2>
              <p className="text-base font-light leading-relaxed text-muted-foreground">
                {copy.whatToSee}
              </p>
              <Link
                to={`/blog/${town.guideSlug}`}
                className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline underline-offset-4"
              >
                {t("nearby.readGuide")}
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>

              <aside className="mt-10 rounded-xl border border-border bg-muted/40 p-6 sm:p-7">
                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-primary">
                  {t("nearby.tipTitle")}
                </p>
                <p className="font-light leading-relaxed text-muted-foreground">
                  {copy.tip}
                </p>
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

              <h2 className="mt-14 mb-6 font-display text-2xl sm:text-3xl font-light text-foreground">
                {t("nearby.faqTitle")}
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-lg border border-border bg-card p-5"
                  >
                    <summary className="cursor-pointer list-none font-light text-foreground marker:hidden">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>

              <p className="mt-12 text-sm text-muted-foreground font-light">
                {isEnglish ? "Also nearby: " : "También cerca: "}
                {otherTowns.map((other, index) => (
                  <span key={other.slug}>
                    {index > 0 && " · "}
                    <Link to={`/${other.slug}`} className="text-primary hover:underline underline-offset-4">
                      {allCopy[other.key]?.breadcrumb}
                    </Link>
                  </span>
                ))}
              </p>
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

export default NearbyTown;
