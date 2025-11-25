import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Euro } from "lucide-react";
import { useTranslation } from "react-i18next";

const Pricing = () => {
  const { t } = useTranslation();
  
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
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light mb-6 text-foreground">
              {t('pricing.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-8">
              {t('pricing.subtitle')}
            </p>
            <div className="max-w-2xl mx-auto space-y-3 text-base">
              <p className="text-foreground">
                <strong>{t('pricing.directBooking')}</strong> {t('pricing.directBookingDesc')}
              </p>
              <p className="text-foreground">
                <strong>{t('pricing.longStay')}</strong> {t('pricing.longStayDesc')}
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-20 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            
            {/* Fin de Semana Card */}
            <Card className="p-8 bg-card hover:shadow-xl transition-all duration-300 border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-primary/10">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-light text-foreground">
                  {t('pricing.weekend')}
                </h2>
              </div>
              
              <p className="text-muted-foreground mb-6 font-light">
                {t('pricing.weekendDesc')}
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <span className="text-foreground font-light">{t('pricing.lowSeason')}</span>
                  <div className="flex items-center gap-1 text-primary font-medium text-xl">
                    <Euro className="w-5 h-5" />
                    <span>250</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <span className="text-foreground font-light">{t('pricing.highSeason')}</span>
                  <div className="flex items-center gap-1 text-primary font-medium text-xl">
                    <Euro className="w-5 h-5" />
                    <span>300</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground font-light flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {t('pricing.from3rdDay')}
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-light">{t('pricing.lowSeason')}</span>
                    <span className="text-foreground font-medium">100€/{t('pricing.perDay')}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-light">{t('pricing.highSeason')}</span>
                    <span className="text-foreground font-medium">150€/{t('pricing.perDay')}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Entre Semana Card */}
            <Card className="p-8 bg-card hover:shadow-xl transition-all duration-300 border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-primary/10">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-light text-foreground">
                  {t('pricing.weekday')}
                </h2>
              </div>
              
              <p className="text-muted-foreground mb-6 font-light">
                {t('pricing.weekdayDesc')}
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <span className="text-foreground font-light">{t('pricing.lowSeason')}</span>
                  <div className="flex items-center gap-1 text-primary font-medium text-xl">
                    <Euro className="w-5 h-5" />
                    <span>200</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <span className="text-foreground font-light">{t('pricing.highSeason')}</span>
                  <div className="flex items-center gap-1 text-primary font-medium text-xl">
                    <Euro className="w-5 h-5" />
                    <span>250</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground font-light">
                  {t('pricing.fullDayPrice')}
                </p>
              </div>
            </Card>

          </div>

          {/* Additional Info */}
          <div className="max-w-5xl mx-auto mt-12">
            <Card className="p-8 bg-card/50 border-border/30">
              <h3 className="text-xl font-display font-light mb-4 text-foreground">
                {t('pricing.additionalInfo')}
              </h3>
              <ul className="space-y-3 text-muted-foreground font-light">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>{t('pricing.info1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>{t('pricing.info2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>{t('pricing.info3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>{t('pricing.info4')}</span>
                </li>
              </ul>
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
