import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const WHATSAPP = "34638014458";
const VENTAJAS = ["flexible", "pets", "experience"] as const;

/**
 * El motivo para reservar conmigo y no por un portal.
 *
 * Aquí está el precio "desde", que filtra curiosos y trae consultas más
 * serias, y las tres ventajas de la reserva directa. Es la única pieza de
 * la portada con un botón de WhatsApp escrito, para no repetirlo tres
 * veces teniendo ya el botón flotante.
 */
const DirectBooking = () => {
  const { t } = useTranslation();
  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t("direct.whatsappMessage"))}`;

  return (
    <section className="bg-secondary/35" aria-labelledby="reserva-directa">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <div>
            <p
              className="text-sm uppercase tracking-[0.2em] text-primary"
              id="reserva-directa"
            >
              {t("direct.eyebrow")}
            </p>
            <p className="mt-3 font-display text-2xl font-light text-foreground sm:text-3xl">
              {t("direct.priceFrom")}{" "}
              <span className="text-base font-light text-muted-foreground sm:text-lg">
                {t("direct.priceUnit")}
              </span>
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-3 sm:gap-x-6">
              {VENTAJAS.map((ventaja) => (
                <li className="flex items-start gap-2.5 text-sm font-light text-foreground" key={ventaja}>
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-primary"
                    size={17}
                    strokeWidth={1.75}
                  />
                  {t(`direct.perks.${ventaja}`)}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-[60ch] text-sm font-light leading-relaxed text-muted-foreground">
              {t("direct.note")}
            </p>
          </div>

          <a
            className="inline-flex items-center justify-center rounded-md bg-secondary px-8 py-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/85"
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {t("direct.cta")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default DirectBooking;
