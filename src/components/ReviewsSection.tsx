import { useEffect, useState } from "react";
import { ExternalLink, Quote, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";

const GOOGLE_MAPS_REVIEW_URL =
  "https://www.google.com/maps/search/?api=1&query=Casa+Rural+Eufemia,+Calle+Juan+Jos%C3%A9+Jim%C3%A9nez+4,+13619+Arenales+de+San+Gregorio,+Ciudad+Real,+Espa%C3%B1a";

type GoogleReview = {
  author: string;
  rating: number;
  text: string;
  relativeTime?: string;
};

type ReviewsResponse = {
  configured?: boolean;
  googleMapsUri?: string;
  rating?: number | null;
  userRatingCount?: number | null;
  reviews?: GoogleReview[];
};

const RatingStars = ({ rating, label }: { rating: number; label: string }) => (
  <div className="flex items-center gap-1" aria-label={label}>
    {Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < Math.round(rating) ? "fill-primary text-primary" : "text-border"}`}
        aria-hidden="true"
      />
    ))}
  </div>
);

const ReviewsSection = () => {
  const { t, i18n } = useTranslation();
  const copy = i18n.language?.startsWith("en")
    ? {
        eyebrow: "Verified reviews",
        ratingAria: (rating: number) => `Rating of ${rating} out of 5`,
        ratingCount: (count: number) => `${count} Google reviews`,
        fallbackTitle: "Read the reviews on Google",
        fallbackText: "Verified reviews are displayed directly from Google Maps. While they are being updated, you can read them all on Casa Eufemia's listing.",
        googleAttribution: "Reviews and ratings provided by Google Maps.",
        viewAll: "View all reviews",
      }
    : {
        eyebrow: "Opiniones verificadas",
        ratingAria: (rating: number) => `Valoración de ${rating} sobre 5`,
        ratingCount: (count: number) => `${count} reseñas en Google`,
        fallbackTitle: "Consulta las opiniones en Google",
        fallbackText: "Las reseñas verificadas se muestran directamente desde Google Maps. Mientras se actualizan, puedes leerlas todas desde la ficha de Casa Eufemia.",
        googleAttribution: "Opiniones y valoraciones proporcionadas por Google Maps.",
        viewAll: "Ver todas las reseñas",
      };
  const [reviewsData, setReviewsData] = useState<ReviewsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadReviews = async () => {
      try {
        const response = await fetch("/api/google-reviews", { signal: controller.signal });
        if (!response.ok) throw new Error("Unable to load Google reviews");
        const data = (await response.json()) as ReviewsResponse;
        setReviewsData(data);
      } catch (error) {
        if ((error as Error).name !== "AbortError") setReviewsData(null);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    void loadReviews();
    return () => controller.abort();
  }, []);

  const reviews = reviewsData?.reviews ?? [];
  const googleMapsUrl = reviewsData?.googleMapsUri || GOOGLE_MAPS_REVIEW_URL;
  const hasLiveReviews = Boolean(reviewsData?.configured && reviews.length > 0);
  const hasRating = typeof reviewsData?.rating === "number";

  return (
    <section id="opiniones" className="bg-muted/30 px-4 py-20 sm:py-24" aria-labelledby="reviews-title">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {copy.eyebrow}
          </p>
          <h2 id="reviews-title" className="mb-4 font-display text-3xl font-light tracking-tight sm:text-4xl">
            {t("reviews.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {t("reviews.subtitle")}
          </p>
          {hasRating && (
            <div className="mt-5 flex items-center justify-center gap-3">
              <RatingStars
                rating={reviewsData.rating ?? 0}
                label={copy.ratingAria(reviewsData.rating ?? 0)}
              />
              <span className="font-medium text-foreground">{reviewsData.rating?.toFixed(1)}</span>
              {typeof reviewsData.userRatingCount === "number" && (
                <span className="text-sm text-muted-foreground">
                  {copy.ratingCount(reviewsData.userRatingCount)}
                </span>
              )}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
            {Array.from({ length: 3 }, (_, index) => (
              <Card key={index} className="min-h-56 animate-pulse">
                <CardContent className="p-7">
                  <div className="mb-5 h-4 w-24 rounded bg-muted" />
                  <div className="space-y-3">
                    <div className="h-3 rounded bg-muted" />
                    <div className="h-3 rounded bg-muted" />
                    <div className="h-3 w-3/4 rounded bg-muted" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : hasLiveReviews ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <Card key={`${review.author}-${index}`} className="flex h-full border-border bg-card shadow-sm">
                <CardContent className="flex h-full flex-col p-7">
                  <Quote className="mb-5 h-7 w-7 text-primary/70" aria-hidden="true" />
                  <RatingStars
                    rating={review.rating}
                    label={copy.ratingAria(review.rating)}
                  />
                  <blockquote className="mt-5 flex-1 text-sm font-light leading-relaxed text-muted-foreground">
                    “{review.text}”
                  </blockquote>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="font-medium text-foreground">{review.author}</p>
                    {review.relativeTime && (
                      <p className="mt-1 text-xs text-muted-foreground">{review.relativeTime}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mx-auto max-w-3xl border-border bg-card shadow-sm">
            <CardContent className="p-8 text-center sm:p-10">
              <Quote className="mx-auto mb-5 h-8 w-8 text-primary" aria-hidden="true" />
              <h3 className="mb-3 font-display text-2xl font-light text-foreground">
                {copy.fallbackTitle}
              </h3>
              <p className="mx-auto max-w-xl font-light leading-relaxed text-muted-foreground">
                {copy.fallbackText}
              </p>
            </CardContent>
          </Card>
        )}

        <div className="mt-9 text-center">
          <p className="mb-4 text-sm text-muted-foreground">{copy.googleAttribution}</p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              {copy.viewAll}
            </a>
            <a
              href={GOOGLE_MAPS_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Star className="h-4 w-4 fill-current" />
              {t("reviews.ctaLink")}
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{t("reviews.ctaText")}</p>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
