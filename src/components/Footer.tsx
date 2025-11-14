import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-display font-light tracking-tight text-foreground mb-4">
              Casa Eufemia
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 font-light">
              Tu casa rural en el corazón de La Mancha.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-light text-foreground mb-4">
              Contacto
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:ruraleufemia@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={18} />
                <span>ruraleufemia@gmail.com</span>
              </a>
              <a
                href="tel:+34638014458"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone size={18} />
                <span>+34 638 014 458</span>
              </a>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <span>
                  Calle Juan José Jiménez 4<br />
                  13619 Arenales de San Gregorio<br />
                  Ciudad Real, España
                </span>
              </div>
            </div>
          </div>

          {/* Social & Info */}
          <div>
            <h4 className="text-base font-light text-foreground mb-4">
              Síguenos
            </h4>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Número de Registro Turístico:<br />
              <span className="font-medium">CR-XXXXX-XX</span>
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Casa Eufemia. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
