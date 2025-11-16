import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  article?: {
    publishedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

const SEO = ({
  title = "Casa Eufemia - Casa Rural de Lujo en Arenales de San Gregorio, Ciudad Real",
  description = "Descubre Casa Eufemia, tu casa rural de lujo en Arenales de San Gregorio, Ciudad Real. Alojamiento acogedor con piscina, jardín y todas las comodidades para unas vacaciones perfectas en La Mancha. Reserva ahora tu escapada rural.",
  keywords = "casa rural Ciudad Real, casaeufemia, casa eufemia, alojamiento rural La Mancha, casa con piscina Ciudad Real, turismo rural Arenales de San Gregorio, vacaciones rurales España, casa rural lujo, alquiler casa rural",
  image = "/6. Piscina.jpg",
  url = "https://www.casaeufemia.com/",
  type = "website",
  article,
}: SEOProps) => {
  const fullTitle = title.includes("Casa Eufemia") ? title : `${title} | Casa Eufemia`;
  const fullUrl = url.startsWith("http") ? url : `https://www.casaeufemia.com/${url}`;
  const fullImage = image.startsWith("http") ? image : `https://www.casaeufemia.com${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="Casa Eufemia" />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Article specific tags */}
      {article && type === "article" && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Geo Tags */}
      <meta name="geo.region" content="ES-CM" />
      <meta name="geo.placename" content="Arenales de San Gregorio, Ciudad Real" />
      <meta name="geo.position" content="39.3598;-3.7321" />
      <meta name="ICBM" content="39.3598, -3.7321" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="Spanish" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Casa Eufemia" />
    </Helmet>
  );
};

export default SEO;
