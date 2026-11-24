import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { absoluteUrl, alternatePath, langOf } from "@/lib/locales";

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
  title = "Casa Rural Eufemia | Arenales de San Gregorio",
  description = "Casa Rural Eufemia en Arenales de San Gregorio, Ciudad Real: hasta 8 personas, piscina privada, jardín, barbacoa, dos baños y mascotas bajo consulta.",
  keywords = "casa rural eufemia, casa rural en Ciudad Real, casa rural en Arenales de San Gregorio, casa rural cerca de Tomelloso, casa rural para 8 personas, casa rural con piscina privada en Ciudad Real, casa rural pet friendly, casa rural con dos baños",
  image = "/galeria/casa-rural-piscina-privada-ciudad-real.jpg",
  url = "https://www.casaeufemia.com/",
  type = "website",
  noindex = false,
  article,
}: SEOProps) => {
  const brandName = "Casa Rural Eufemia";
  const brandKeyword = "casa rural eufemia";
  const brandTitle = title.replace(/Casa Eufemia/gi, brandName);
  // La marca solo se añade si el título sigue cabiendo en Google (unos 60
  // caracteres). Si no, vale más el título que la firma.
  const withBrand = `${brandTitle} | ${brandName}`;
  const fullTitle = brandTitle.includes(brandName)
    ? brandTitle
    : withBrand.length <= 62
      ? withBrand
      : brandTitle;
  const fullDescription = description.replace(/Casa Eufemia/gi, brandName);
  const fullKeywords = keywords.toLowerCase().includes(brandKeyword)
    ? keywords
    : `${brandKeyword}, ${keywords}`;
  const siteUrl = "https://www.casaeufemia.com";
  // El canónico sale de la dirección real, no de la que pasa cada página:
  // así /gallery y /en/gallery, que comparten componente, no se declaran
  // la misma página y no se canibalizan.
  const { pathname } = useLocation();
  const lang = langOf(pathname);
  const otherPath = alternatePath(pathname);
  const esUrl = lang === "es" ? absoluteUrl(pathname) : otherPath ? absoluteUrl(otherPath) : null;
  const enUrl = lang === "en" ? absoluteUrl(pathname) : otherPath ? absoluteUrl(otherPath) : null;
  const fullUrl = pathname && pathname !== "/" ? absoluteUrl(pathname) : new URL(url, siteUrl).toString();
  const fullImage = new URL(image, siteUrl).toString();
  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <link rel="canonical" href={fullUrl} />

      {/* Cada idioma en su dirección: así Google indexa las dos y le enseña
          a cada uno la que le toca. x-default apunta al español. */}
      {esUrl && <link rel="alternate" hrefLang="es" href={esUrl} />}
      {enUrl && <link rel="alternate" hrefLang="en" href={enUrl} />}
      {esUrl && <link rel="alternate" hrefLang="x-default" href={esUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={brandName} />
      <meta property="og:locale" content={lang === "en" ? "en_GB" : "es_ES"} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
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
      <meta name="geo.position" content="39.3097;-3.0270" />
      <meta name="ICBM" content="39.3097, -3.0270" />

      {/* Additional SEO */}
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="language" content={lang === "en" ? "English" : "Spanish"} />
      <meta name="author" content={brandName} />
    </Helmet>
  );
};

export default SEO;
