import {
  ArrowUpRight,
  CalendarCheck2,
  Facebook,
  ImageIcon,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Casa+Rural+Eufemia,+Calle+Juan+Jos%C3%A9+Jim%C3%A9nez+4,+13619+Arenales+de+San+Gregorio,+Ciudad+Real,+Espa%C3%B1a";
const WHATSAPP_URL =
  "https://wa.me/34638014458?text=Hola%2C%20me%20gustar%C3%ADa%20consultar%20disponibilidad%20en%20Casa%20Eufemia.";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const copy = i18n.language?.startsWith("en")
    ? {
        eyebrow: "Arenales de San Gregorio · Ciudad Real",
        description: "A rural house for up to 8 guests with a private pool, garden and barbecue to relax in La Mancha.",
        locationText: "A peaceful getaway near Tomelloso, Campo de Criptana and the Lagunas de Ruidera.",
        explore: "Explore the house",
        whatsapp: "Book on WhatsApp",
        availability: "View pricing",
      }
    : {
        eyebrow: "Arenales de San Gregorio · Ciudad Real",
        description: "Una casa rural para hasta 8 personas con piscina privada, jardín y barbacoa para desconectar en La Mancha.",
        locationText: "Una escapada tranquila cerca de Tomelloso, Campo de Criptana y las Lagunas de Ruidera.",
        explore: "Explora la casa",
        whatsapp: "Reservar por WhatsApp",
        availability: "Ver precios",
      };

  const quickLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/gallery", label: t("nav.gallery"), icon: ImageIcon },
    { to: "/blog", label: t("nav.experiences") },
    { to: "/pricing", label: t("nav.pricing"), icon: CalendarCheck2 },
  ];

  return (
    <footer className="overflow-hidden bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground/70">
              {copy.eyebrow}
            </p>
            <h2 className="mb-5 font-display text-4xl font-light tracking-tight text-background sm:text-5xl">
              Casa Eufemia
            </h2>
            <p className="max-w-sm text-sm font-light leading-relaxed text-background/75">
              {copy.description}
            </p>
            <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-background/65">
              {copy.locationText}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <MessageCircle className="h-4 w-4" />
                {copy.whatsapp}
              </a>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-background/25 px-5 py-3 text-sm font-medium text-background transition-colors hover:border-background/50 hover:bg-background/10"
              >
                <CalendarCheck2 className="h-4 w-4" />
                {copy.availability}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-5 text-sm font-medium uppercase tracking-[0.16em] text-background/70">
              {copy.explore}
            </h3>
            <nav aria-label={copy.explore}>
              <ul className="space-y-3">
                {quickLinks.map(({ to, label, icon: Icon }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="group inline-flex items-center gap-2 text-sm text-background/75 transition-colors hover:text-background"
                    >
                      {Icon && <Icon className="h-4 w-4 text-primary" />}
                      <span>{label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-5 text-sm font-medium uppercase tracking-[0.16em] text-background/70">
              {t("footer.contact")}
            </h3>
            <div className="space-y-4 text-sm">
              <a
                href="mailto:ruraleufemia@gmail.com"
                className="flex items-center gap-3 text-background/75 transition-colors hover:text-background"
              >
                <Mail className="h-[18px] w-[18px] shrink-0 text-primary" />
                <span>ruraleufemia@gmail.com</span>
              </a>
              <a
                href="tel:+34638014458"
                className="flex items-center gap-3 text-background/75 transition-colors hover:text-background"
              >
                <Phone className="h-[18px] w-[18px] shrink-0 text-primary" />
                <span>+34 638 014 458</span>
              </a>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-background/75 transition-colors hover:text-background"
              >
                <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-primary" />
                <span>{t("pricing.address")}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-5 text-sm font-medium uppercase tracking-[0.16em] text-background/70">
              {t("footer.followUs")}
            </h3>
            <div className="mb-7 flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61579453261697"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 text-background/80 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/casa_eufemia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 text-background/80 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-background/75 transition-colors hover:text-background"
            >
              <Star className="h-[18px] w-[18px] fill-primary text-primary" />
              <span>{t("footer.reviewUs")}</span>
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-background/15 pt-6 text-xs text-background/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Casa Eufemia. {t("footer.rights")}
          </p>
          <p>{t("footer.tagline")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
