import { Suspense, useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import ScrollToTop from "@/components/ScrollToTop";
import { langOf } from "@/lib/locales";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import NearbyTown from "./pages/NearbyTown";
import PoolAndBarbecue from "./pages/PoolAndBarbecue";
import DogFriendly from "./pages/DogFriendly";
import MadridGetaway from "./pages/MadridGetaway";
import { DOGS_SLUG, MADRID_SLUG, POOL_BBQ_SLUG } from "@/lib/slugs";
import { nearbyTowns } from "@/data/nearbyTowns";

const queryClient = new QueryClient();

const RouteLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-background" aria-live="polite">
    <span className="text-sm text-muted-foreground">Cargando…</span>
  </div>
);

/**
 * Pone el idioma según la dirección: todo lo que empieza por /en se
 * renderiza en inglés. Así el idioma lo decide la URL y no el navegador,
 * que es lo que necesita Google para indexar las dos versiones.
 *
 * Esto es solo una red de seguridad. Lo normal es que el idioma ya venga
 * bien de antes: el prerenderizado lo fija antes de generar el HTML y en
 * el navegador lo fija la configuración de i18n al arrancar, leyendo la
 * dirección. El selector de idioma recarga la página, así que tampoco pasa
 * por aquí.
 */
const LocaleFromPath = () => {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const lang = langOf(pathname);
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [i18n, lang]);
  return null;
};

export const AppRoutes = () => {
  return (
    <Suspense fallback={<RouteLoading />}>
      <LocaleFromPath />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path={`/${POOL_BBQ_SLUG}`} element={<PoolAndBarbecue />} />
        <Route path={`/${DOGS_SLUG}`} element={<DogFriendly />} />
        <Route path={`/${MADRID_SLUG}`} element={<MadridGetaway />} />
        {nearbyTowns.map((town) => (
          <Route key={town.slug} path={`/${town.slug}`} element={<NearbyTown town={town} />} />
        ))}

        {/* Las mismas páginas en inglés, con direcciones propias. */}
        <Route path="/en" element={<Index />} />
        <Route path="/en/gallery" element={<Gallery />} />
        <Route path="/en/blog" element={<Blog />} />
        <Route path="/en/blog/:id" element={<BlogPost />} />
        <Route path="/en/pricing" element={<Pricing />} />
        <Route path="/en/rural-house-with-pool-and-barbecue" element={<PoolAndBarbecue />} />
        <Route path="/en/dog-friendly-rural-house" element={<DogFriendly />} />
        <Route path="/en/rural-getaway-from-madrid" element={<MadridGetaway />} />
        {nearbyTowns.map((town) => (
          <Route
            key={town.slugEn}
            path={`/en/${town.slugEn}`}
            element={<NearbyTown town={town} />}
          />
        ))}

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export const AppProviders = ({
  children,
  helmetContext,
}: {
  children: ReactNode;
  helmetContext?: { helmet?: HelmetServerState };
}) => (
  <HelmetProvider context={helmetContext}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
