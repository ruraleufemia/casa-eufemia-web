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

  return ranges
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
};

/**
 * Private Booking iCal proxy. Keep BOOKING_ICAL_URL in Vercel environment
 * variables so the export token is never sent to the browser.
 */
export default async function handler(request, response) {
  if (request.method && request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const calendarUrl = process.env.BOOKING_ICAL_URL;

  if (!calendarUrl) {
    return response.status(200).json({ configured: false, ranges: [] });
  }

  try {
    const calendarResponse = await fetch(calendarUrl, {
      headers: { Accept: "text/calendar" },
    });

    if (!calendarResponse.ok) {
      throw new Error("Booking iCal request failed");
    }

    const calendar = await calendarResponse.text();
    const ranges = parseBookingRanges(calendar);

    response.setHeader(
      "Cache-Control",
      `public, s-maxage=${MAX_CACHE_AGE_SECONDS}, stale-while-revalidate=3600`,
    );

    return response.status(200).json({
      configured: true,
      ranges,
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return response.status(502).json({
      configured: false,
      ranges: [],
      error: "Availability is temporarily unavailable",
    });
  }
}
