import { CalendarDays, Check, CircleAlert, X } from "lucide-react";
import { es, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { Calendar } from "@/components/ui/calendar";
import {
  isDateUnavailable,
  useBookingAvailability,
} from "@/hooks/useBookingAvailability";

const AvailabilityCalendar = () => {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language?.startsWith("en");
  const { data, isError, isPending } = useBookingAvailability();
  const ranges = data?.ranges ?? [];

  const copy = isEnglish
    ? {
        eyebrow: "Booking availability",
        title: "Choose the dates for your stay",
        description: "This calendar is synchronised with Booking. Green dates are available and red dates are occupied.",
        loading: "Loading availability…",
        unavailable: "We cannot load the calendar at the moment. Please contact us on WhatsApp to confirm your dates.",
        available: "Available",
        occupied: "Occupied",
        note: "Availability is indicative until we confirm your booking.",
      }
    : {
        eyebrow: "Disponibilidad",
        title: "Consulta las fechas de tu estancia",
        description: "Este calendario se sincroniza con Booking. Las fechas en verde están disponibles y las rojas están ocupadas.",
        loading: "Cargando disponibilidad…",
        unavailable: "No podemos cargar el calendario en este momento. Consúltanos por WhatsApp para confirmar tus fechas.",
        available: "Disponible",
        occupied: "Ocupado",
        note: "La disponibilidad es orientativa hasta confirmar la reserva.",
      };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const canShowCalendar = Boolean(data?.configured && !isError);

  return (
    <section id="disponibilidad" className="pb-20 px-4" aria-labelledby="availability-title">
      <div className="max-w-5xl mx-auto rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {copy.eyebrow}
          </p>
          <h2 id="availability-title" className="mb-3 text-3xl font-display font-light text-foreground sm:text-4xl">
            {copy.title}
          </h2>
          <p className="font-light leading-relaxed text-muted-foreground">{copy.description}</p>
        </div>

        {isPending ? (
          <div className="flex min-h-72 items-center justify-center gap-3 text-muted-foreground" aria-live="polite">
            <CalendarDays className="h-5 w-5 animate-pulse text-primary" aria-hidden="true" />
            <span>{copy.loading}</span>
          </div>
        ) : canShowCalendar ? (
          <>
            <div className="mx-auto w-fit max-w-full overflow-x-auto rounded-xl border border-border bg-background p-2">
              <Calendar
                className="mx-auto"
                locale={isEnglish ? enUS : es}
                numberOfMonths={2}
                fromDate={today}
                modifiers={{
                  available: (date) => date >= today && !isDateUnavailable(date, ranges),
                  booked: (date) => isDateUnavailable(date, ranges),
                  past: (date) => date < today,
                }}
                modifiersClassNames={{
                  available: "bg-primary/10 text-primary font-medium hover:bg-primary/15",
                  booked: "bg-destructive/15 text-destructive line-through font-medium hover:bg-destructive/20",
                  past: "text-muted-foreground/35",
                }}
                showOutsideDays={false}
              />
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground" aria-label={copy.eyebrow}>
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                {copy.available}
              </span>
              <span className="inline-flex items-center gap-2">
                <X className="h-4 w-4 text-destructive" aria-hidden="true" />
                {copy.occupied}
              </span>
            </div>
            <p className="mt-5 text-center text-xs text-muted-foreground">{copy.note}</p>
          </>
        ) : (
          <div className="mx-auto flex max-w-2xl items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-50 p-5 text-sm text-amber-950" role="status">
            <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
            <p>{copy.unavailable}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AvailabilityCalendar;
