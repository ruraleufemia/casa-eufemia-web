import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Euro } from "lucide-react";

const Pricing = () => {
  return (
    <>
      <SEO
        title="Precios y Tarifas"
        description="Consulta nuestras tarifas para alquilar Casa Eufemia. Precios competitivos para tu escapada rural en Ciudad Real."
        url="/pricing"
        keywords="precios casa rural, tarifas alquiler, alojamiento Ciudad Real, casa rural económica, reservar casa rural"
      />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light mb-6 text-foreground">
              Tarifas y Precios
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              Consulta nuestras tarifas para disfrutar de una estancia inolvidable en Casa Eufemia
            </p>
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
                  Fin de Semana
                </h2>
              </div>
              
              <p className="text-muted-foreground mb-6 font-light">
                Viernes a Domingo (mínimo 2 noches)
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <span className="text-foreground font-light">Temporada Baja</span>
                  <div className="flex items-center gap-1 text-primary font-medium text-xl">
                    <Euro className="w-5 h-5" />
                    <span>250</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <span className="text-foreground font-light">Temporada Alta</span>
                  <div className="flex items-center gap-1 text-primary font-medium text-xl">
                    <Euro className="w-5 h-5" />
                    <span>300</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground font-light flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  A partir del 3er día
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-light">Temporada Baja</span>
                    <span className="text-foreground font-medium">100€/día</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-light">Temporada Alta</span>
                    <span className="text-foreground font-medium">150€/día</span>
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
                  Entre Semana
                </h2>
              </div>
              
              <p className="text-muted-foreground mb-6 font-light">
                Domingo a Viernes (disponible desde 1 día)
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <span className="text-foreground font-light">Temporada Baja</span>
                  <div className="flex items-center gap-1 text-primary font-medium text-xl">
                    <Euro className="w-5 h-5" />
                    <span>200</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <span className="text-foreground font-light">Temporada Alta</span>
                  <div className="flex items-center gap-1 text-primary font-medium text-xl">
                    <Euro className="w-5 h-5" />
                    <span>300</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground font-light">
                  Precio por día completo de alojamiento
                </p>
              </div>
            </Card>

          </div>

          {/* Additional Info */}
          <div className="max-w-5xl mx-auto mt-12">
            <Card className="p-8 bg-card/50 border-border/30">
              <h3 className="text-xl font-display font-light mb-4 text-foreground">
                Información Adicional
              </h3>
              <ul className="space-y-3 text-muted-foreground font-light">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Los precios incluyen el uso de todas las instalaciones de la casa</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Temporada alta: julio, agosto, Semana Santa, puentes y festivos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Para reservas o consultas, contacta con nosotros a través del formulario</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Pricing;