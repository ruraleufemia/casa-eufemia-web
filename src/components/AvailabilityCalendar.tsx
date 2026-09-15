import { useState } from "react";
import { CalendarDays, Check, CircleAlert, MessageCircle, X } from "lucide-react";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  isDateUnavailable,
  useBookingAvailability,
} from "@/hooks/useBookingAvailability";

const hasUnavailableDateInRange = (range: DateRange, ranges: { start: string; end: string }[]) => {
  if (!range.from || !range.to) return false;

  const date = new Date(range.from);
  const end = new Date(range.to);

  while (date <= end) {
    if (isDateUnavailable(date, ranges)) return true;
    date.setDate(date.getDate() + 1);
  }

  return false;
};

const AvailabilityCalendar = () => {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language?.startsWith("en");
  const { data, isError, isPending } = useBookingAvailability();
  const ranges = data?.ranges ?? [];
  const [selectedRange, setSelectedRange] = useState<DateRange>();
  const [selectionError, setSelectionError] = useState(false);

  const copy = isEnglish
    ? {
        eyebrow: "Booking availability",
        title: "Choose the dates for your stay",
        description: "This calendar is synchronised with Booking. Green dates are available and red dates are occupied.",
        loading: "Loading availability…",
        unavailable: "We cannot load the calendar at the moment. Please contact us on WhatsApp to confirm your dates.",
        available: "Available",
        occupied: "Occupied",
        selectDates: "Select your arrival date first, then your departure date.",
        selectDeparture: "Now select your departure date.",
        selectedStay: "Selected stay",
        checkIn: "Check-in",
        checkOut: "Check-out",
        resetDates: "Change dates",
        unavailableRange: "Those dates include an occupied night. Choose a continuous available period.",
        whatsapp: "Ask about these dates on WhatsApp",
        whatsappLabel: "Ask availability for the selected dates on WhatsApp",
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
        selectDates: "Selecciona primero la fecha de entrada y después la de salida.",
        selectDeparture: "Ahora selecciona la fecha de salida.",
        selectedStay: "Estancia seleccionada",
        checkIn: "Entrada",
        checkOut: "Salida",
        resetDates: "Cambiar fechas",
        unavailableRange: "Las fechas elegidas incluyen una noche ocupada. Elige un periodo continuo disponible.",
        whatsapp: "Consultar estas fechas por WhatsApp",
        whatsappLabel: "Consultar por WhatsApp la disponibilidad de las fechas seleccionadas",
        note: "La disponibilidad es orientativa hasta confirmar la reserva.",
      };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const canShowCalendar = Boolean(data?.configured && !isError);
  const calendarLocale = isEnglish ? enUS : es;
  const selectedStay = Boolean(selectedRange?.from && selectedRange.to);
  const formattedDate = (date: Date) =>
    format(date, isEnglish ? "MMM d, yyyy" : "d 'de' MMMM 'de' yyyy", {
      locale: calendarLocale,
    });
  const whatsappMessage = selectedStay
    ? isEnglish
      ? `Hello! I would like to check availability at Casa Rural Eufemia from ${formattedDate(selectedRange.from!)} to ${formattedDate(selectedRange.to!)}.`
      : `¡Hola! Me gustaría consultar disponibilidad en Casa Rural Eufemia del ${formattedDate(selectedRange.from!)} al ${formattedDate(selectedRange.to!)}.`
    : "";
  const whatsappUrl = `https://wa.me/34638014458?text=${encodeURIComponent(whatsappMessage)}`;

  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from && range.to && hasUnavailableDateInRange(range, ranges)) {
      setSelectedRange(undefined);
      setSelectionError(true);
      return;
    }

    setSelectedRange(range);
    setSelectionError(false);
  };

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
                mode="range"
                min={2}
                selected={selectedRange}
                onSelect={handleSelect}
                disabled={(date) => date < today || isDateUnavailable(date, ranges)}
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

            <div className="mx-auto mt-6 max-w-2xl text-center" aria-live="polite">
              {selectionError ? (
                <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {copy.unavailableRange}
                </p>
              ) : selectedStay ? (
                <div className="rounded-xl border border-primary/25 bg-primary/5 px-4 py-4">
                  <p className="text-sm font-medium text-foreground">{copy.selectedStay}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {copy.checkIn}: {formattedDate(selectedRange.from!)} · {copy.checkOut}: {formattedDate(selectedRange.to!)}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={copy.whatsappLabel}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#20BA5A]"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      {copy.whatsapp}
                    </a>
                    <button
                      type="button"
                      onClick={() => setSelectedRange(undefined)}
                      className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {copy.resetDates}
                    </button>
                  </div>
                </div>
              ) : selectedRange?.from ? (
                <p className="text-sm text-muted-foreground">{copy.selectDeparture}</p>
              ) : (
                <p className="text-sm text-muted-foreground">{copy.selectDates}</p>
              )}
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
