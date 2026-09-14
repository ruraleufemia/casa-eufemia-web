import { useQuery } from "@tanstack/react-query";

export type BookingRange = {
  start: string;
  end: string;
};

export type BookingAvailability = {
  configured: boolean;
  ranges: BookingRange[];
  updatedAt?: string;
};

const fetchBookingAvailability = async (): Promise<BookingAvailability> => {
  const response = await fetch("/api/booking-availability");

  if (!response.ok) {
    throw new Error("Unable to load Booking availability");
  }

  return response.json() as Promise<BookingAvailability>;
};

export const dateToKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/** Booking iCal DTEND is the checkout date, so it is not part of the blocked range. */
export const isDateUnavailable = (date: Date, ranges: BookingRange[]) => {
  const dateKey = dateToKey(date);

  return ranges.some((range) => dateKey >= range.start && dateKey < range.end);
};

export const useBookingAvailability = () =>
  useQuery({
    queryKey: ["booking-availability"],
    queryFn: fetchBookingAvailability,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
