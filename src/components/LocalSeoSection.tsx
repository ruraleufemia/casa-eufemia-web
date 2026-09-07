import { ArrowRight, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const LocalSeoSection = () => {
  const { t } = useTranslation();

  const guides = [
    {
      title: t("localSeo.tomelloso.title"),
      description: t("localSeo.tomelloso.description"),
      href: "/blog/cooperativa-virgen-de-las-vinas",
    },
    {
      title: t("localSeo.quijote.title"),
      description: t("localSeo.quijote.description"),
      href: "/blog/campo-de-criptana-molinos-de-viento",
    },
    {
      title: t("localSeo.ruidera.title"),
      description: t("localSeo.ruidera.description"),
      href: "/blog/lagunas-de-ruidera",
    },
  ];

  return (
    <section className="py-20 bg-muted/30" aria-labelledby="local-seo-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">
            {t("localSeo.eyebrow")}
          </p>
          <h2 id="local-seo-title" className="text-3xl sm:text-4xl lg:text-5xl font-display font-light tracking-tight text-foreground mb-6">
            {t("localSeo.title")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
            {t("localSeo.intro")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-10">
          {guides.map((guide) => (
            <article key={guide.href} className="bg-card border border-border rounded-xl p-7 flex flex-col">
              <MapPin className="h-6 w-6 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="text-xl font-display font-light text-foreground mb-3">{guide.title}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6 flex-1">
                {guide.description}
              </p>
              <Link
                to={guide.href}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline underline-offset-4"
              >
                {t("localSeo.readGuide")}
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </article>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-background border border-border rounded-xl p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center gap-6">
          <Users className="h-8 w-8 shrink-0 text-primary" strokeWidth={1.5} />
          <div className="flex-1">
            <h3 className="text-2xl font-display font-light text-foreground mb-2">
              {t("localSeo.groups.title")}
            </h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              {t("localSeo.groups.description")}
            </p>
          </div>
          <Link to="/pricing" className="shrink-0">
            <Button variant="outline" className="font-light">
              {t("localSeo.groups.cta")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LocalSeoSection;
