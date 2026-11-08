const CASA_EUFEMIA_PLACE_ID = "ChIJbSYSx-1VaA0RKuoR6Iyw8fI";
const GOOGLE_MAPS_FALLBACK_URL =
  `https://www.google.com/maps/search/?api=1&query=Casa+Rural+Eufemia,+Calle+Juan+Jos%C3%A9+Jim%C3%A9nez+4,+13619+Arenales+de+San+Gregorio,+Ciudad+Real,+Espa%C3%B1a&query_place_id=${CASA_EUFEMIA_PLACE_ID}`;

/**
 * Vercel serverless function. The Google Maps key never reaches the browser.
 * Configure GOOGLE_MAPS_API_KEY in Vercel; GOOGLE_PLACE_ID may override the known ID.
 */
export default async function handler(request, response) {
  if (request.method && request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID || CASA_EUFEMIA_PLACE_ID;

  if (!apiKey) {
    return response.status(200).json({
      configured: false,
      reviews: [],
      googleMapsUri: GOOGLE_MAPS_FALLBACK_URL,
    });
  }

  try {
    const placeResponse = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=es`,
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
        authorUri: review.authorAttribution?.uri || null,
        authorPhotoUri: review.authorAttribution?.photoUri || null,
        rating: Number(review.rating) || 0,
        text: review.text?.text || "",
        relativeTime: review.relativePublishTimeDescription || "",
        googleMapsUri: review.googleMapsUri || null,
      }))
      .filter((review) => review.text && review.googleMapsUri);

    // Google Maps content must not be stored in a CDN cache outside the API terms.
    response.setHeader("Cache-Control", "no-store");
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
