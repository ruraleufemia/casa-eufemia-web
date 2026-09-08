import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
  article?: {
    publishedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

const SEO = ({
  title = "Casa rural en Arenales de San Gregorio | Casa Eufemia",
  description = "Casa rural con piscina privada en Ciudad Real para 8 personas, en Arenales de San Gregorio, cerca de Tomelloso, con jardín y barbacoa.",
  keywords = "casa rural en Ciudad Real, casa rural en Arenales de San Gregorio, casa rural cerca de Tomelloso, casa rural para 8 personas, casa rural con piscina privada en Ciudad Real, alojamiento rural en La Mancha",
  image = "/galeria/casa-rural-piscina-privada-ciudad-real.jpg",
  url = "https://www.casaeufemia.com/",
  type = "website",
  noindex = false,
  article,
}: SEOProps) => {
  const fullTitle = title.includes("Casa Eufemia") ? title : `${title} | Casa Eufemia`;
  const siteUrl = "https://www.casaeufemia.com";
  const fullUrl = new URL(url, siteUrl).toString();
  const fullImage = new URL(image, siteUrl).toString();
  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

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
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="language" content="Spanish" />
      <meta name="author" content="Casa Eufemia" />
    </Helmet>
  );
};

export default SEO;
