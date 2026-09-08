const GOOGLE_MAPS_FALLBACK_URL =
  "https://www.google.com/maps/search/?api=1&query=Casa+Rural+Eufemia,+Calle+Juan+Jos%C3%A9+Jim%C3%A9nez+4,+13619+Arenales+de+San+Gregorio,+Ciudad+Real,+Espa%C3%B1a";

/**
 * Vercel serverless function. The Google Maps key never reaches the browser.
 * Configure GOOGLE_MAPS_API_KEY and GOOGLE_PLACE_ID in the Vercel project.
 */
export default async function handler(request, response) {
  if (request.method && request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return response.status(200).json({
      configured: false,
      reviews: [],
      googleMapsUri: GOOGLE_MAPS_FALLBACK_URL,
    });
  }

  try {
    const placeResponse = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
        },
      },
    );

    if (!placeResponse.ok) {
      throw new Error(`Google Places API returned ${placeResponse.status}`);
    }

    const place = await placeResponse.json();
    const reviews = (place.reviews ?? [])
      .map((review) => ({
        author: review.authorAttribution?.displayName || "Huésped de Google",
        rating: Number(review.rating) || 0,
        text: review.text?.text || "",
        relativeTime: review.relativePublishTimeDescription || "",
      }))
      .filter((review) => review.text);

    response.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
    return response.status(200).json({
      configured: true,
      rating: typeof place.rating === "number" ? place.rating : null,
      userRatingCount: typeof place.userRatingCount === "number" ? place.userRatingCount : null,
      reviews,
      googleMapsUri: place.googleMapsUri || GOOGLE_MAPS_FALLBACK_URL,
    });
  } catch (error) {
    console.error("Unable to load Google reviews", error);
    return response.status(502).json({
      configured: false,
      reviews: [],
      googleMapsUri: GOOGLE_MAPS_FALLBACK_URL,
    });
  }
}
