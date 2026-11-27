const MAX_CACHE_AGE_SECONDS = 900;

const toIsoDate = (value) => {
  const match = /^(\d{4})(\d{2})(\d{2})/.exec(value.trim());
  if (!match) return null;

  return `${match[1]}-${match[2]}-${match[3]}`;
};

export const parseBookingRanges = (calendar) => {
  const lines = calendar.replace(/\r?\n[ \t]/g, "").split(/\r?\n/);
  const ranges = [];
  let event = null;

  const saveEvent = () => {
    if (
      event &&
      event.status !== "CANCELLED" &&
      event.start &&
      event.end &&
      event.end > event.start
    ) {
      ranges.push({ start: event.start, end: event.end });
    }
  };

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      event = {};
      continue;
    }

    if (line === "END:VEVENT") {
      saveEvent();
      event = null;
      continue;
    }

    if (!event) continue;

    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const property = line.slice(0, separator).split(";", 1)[0];
    const value = line.slice(separator + 1);

    if (property === "DTSTART") event.start = toIsoDate(value);
    if (property === "DTEND") event.end = toIsoDate(value);
    if (property === "STATUS") event.status = value.trim().toUpperCase();
  }

  return mergeRanges(ranges);
};

/** Ordena los periodos ocupados y junta los que se solapan o se tocan. */
export const mergeRanges = (ranges) =>
  [...ranges]
    .sort((a, b) => a.start.localeCompare(b.start))
    .reduce((merged, range) => {
      const previous = merged[merged.length - 1];

      if (previous && range.start <= previous.end) {
        previous.end = range.end > previous.end ? range.end : previous.end;
      } else {
        merged.push({ ...range });
      }

      return merged;
    }, []);

/**
 * Lee las direcciones de calendario configuradas.
 *
 * Vale cualquier fuente que exporte iCal: un channel manager como Holidu,
 * que ya trae junta la ocupación de todas las plataformas, o varias
 * direcciones sueltas (Airbnb, Booking) separadas por comas.
 *
 * CALENDAR_ICAL_URLS es el nombre nuevo; BOOKING_ICAL_URL se mantiene para
 * no romper la configuración que ya estuviera puesta.
 */
const calendarUrls = () =>
  (process.env.CALENDAR_ICAL_URLS || process.env.BOOKING_ICAL_URL || "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);

const fetchCalendar = async (url) => {
  const calendarResponse = await fetch(url, { headers: { Accept: "text/calendar" } });

  if (!calendarResponse.ok) {
    throw new Error(`iCal request failed: ${calendarResponse.status}`);
  }

  return parseBookingRanges(await calendarResponse.text());
};

/**
 * Proxy privado de los calendarios. Las direcciones viven en las variables
 * de entorno de Vercel y nunca llegan al navegador: llevan un token y quien
 * la tenga puede ver la ocupación de la casa.
 */
export default async function handler(request, response) {
  if (request.method && request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const urls = calendarUrls();

  if (urls.length === 0) {
    return response.status(200).json({ configured: false, ranges: [] });
  }

  try {
    const resultados = await Promise.all(urls.map(fetchCalendar));
    const ranges = mergeRanges(resultados.flat());

    response.setHeader(
      "Cache-Control",
      `public, s-maxage=${MAX_CACHE_AGE_SECONDS}, stale-while-revalidate=3600`,
    );

    return response.status(200).json({
      configured: true,
      calendars: urls.length,
      ranges,
      updatedAt: new Date().toISOString(),
    });
  } catch {
    // Si falla una sola fuente se cae todo a propósito: enseñar media
    // ocupación es peor que no enseñar nada, porque genera dobles reservas.
    return response.status(502).json({
      configured: false,
      ranges: [],
      error: "Availability is temporarily unavailable",
    });
  }
}
