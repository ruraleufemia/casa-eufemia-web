import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { MessageCircle, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const Pricing = () => {
  const { t } = useTranslation();

  const whatsappNumber = "34638014458";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t('pricing.whatsappMessage'))}`;

  return (
    <>
      <SEO
        title={t('pricing.title')}
        description={t('pricing.subtitle')}
        url="/pricing"
        keywords="precios casa rural, tarifas alquiler, alojamiento Ciudad Real, casa rural económica, reservar casa rural"
      />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Navbar />

        {/* Hero + CTA Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light mb-6 text-foreground">
              {t('pricing.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-10">
              {t('pricing.subtitle')}
            </p>

            <Card className="p-8 md:p-10 bg-card border-border/50 shadow-lg">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t('pricing.whatsappCta')}</span>
              </a>

              <div className="mt-8 pt-8 border-t border-border/50 flex items-start justify-center gap-3 text-foreground font-light">
                <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-base md:text-lg">{t('pricing.directBookingNote')}</p>
              </div>
            </Card>
          </div>
        </section>

        {/* Location Section */}
        <section className="pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-light mb-4 text-foreground">
                {t('pricing.locationTitle')}
              </h2>
              <p className="text-muted-foreground font-light">
                {t('pricing.address')}
              </p>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://maps.google.com/maps?q=Calle+Juan+José+Jiménez+4,+13619+Arenales+de+San+Gregorio,+Ciudad+Real,+España&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('pricing.locationTitle')}
              />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Pricing;
