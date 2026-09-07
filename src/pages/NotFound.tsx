import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";

const NotFound = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="Página no encontrada"
        description="La página solicitada no existe en Casa Eufemia."
        url={location.pathname}
        noindex
      />
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">{t('notFound.title')}</h1>
          <p className="mb-4 text-xl text-gray-600">{t('notFound.message')}</p>
          <Link to="/" className="text-blue-500 underline hover:text-blue-700">
            {t('notFound.returnHome')}
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
