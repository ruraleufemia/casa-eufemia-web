import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Camera, Euro, FileText, Loader2, LogOut, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminPosts from "./AdminPosts";
import AdminTexts from "./AdminTexts";
import AdminGallery from "./AdminGallery";
import AdminSeo from "./AdminSeo";
import AdminRates from "./AdminRates";

const sections = [
  { id: "texts", title: "Textos", description: "Cambia la bienvenida, el entorno y los mensajes de la web.", icon: FileText },
  { id: "gallery", title: "Fotografías", description: "Actualiza la foto de bienvenida o añade fotos a la galería.", icon: Camera },
  { id: "posts", title: "Blog", description: "Escribe una experiencia local y publícala cuando esté lista.", icon: BookOpen },
  { id: "rates", title: "Tarifas", description: "Guarda y muestra precios orientativos sin tocar el código.", icon: Euro },
  { id: "seo", title: "SEO", description: "Revisa los títulos y descripciones de las páginas.", icon: Search },
] as const;

const Admin = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [visitedTabs, setVisitedTabs] = useState<string[]>([]);

  const openTab = (tab: string) => {
    setActiveTab(tab);
    setVisitedTabs((current) => current.includes(tab) ? current : [...current, tab]);
  };

  useEffect(() => {
    if (!loading && (!session || !isAdmin)) navigate("/admin/login", { replace: true });
  }, [loading, session, isAdmin, navigate]);

  if (loading || !session || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl font-light tracking-tight sm:text-2xl">Casa Rural Eufemia</h1>
            <p className="text-sm text-muted-foreground">Panel de edición · {session.user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="outline" size="sm" className="font-light">
                Ver web
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={signOut} className="font-light">
              <LogOut className="mr-2 h-4 w-4" /> Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-7">
          <h2 className="font-display text-3xl font-light">Tu espacio de edición</h2>
          <p className="mt-2 text-muted-foreground">Elige qué quieres cambiar. Puedes revisar la web desde el botón «Ver web».</p>
        </div>
        <Tabs value={activeTab} onValueChange={openTab}>
          <TabsList className="mb-8 grid h-auto w-full grid-cols-2 gap-1 p-1 sm:flex sm:flex-wrap sm:justify-start">
            <TabsTrigger value="overview">Inicio</TabsTrigger>
            <TabsTrigger value="texts">Textos</TabsTrigger>
            <TabsTrigger value="gallery">Fotografías</TabsTrigger>
            <TabsTrigger value="posts">Blog</TabsTrigger>
            <TabsTrigger value="rates">Tarifas</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map(({ id, title, description, icon: Icon }) => (
                <button key={id} type="button" onClick={() => openTab(id)} className="group rounded-xl border border-border bg-background p-6 text-left shadow-sm transition-colors hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <Icon className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
                  <span className="flex items-center justify-between font-display text-xl">{title} <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" /></span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{description}</span>
                </button>
              ))}
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <h3 className="font-display text-xl">Cómo hacer un cambio</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Entra en la sección, edita y pulsa «Guardar» o «Publicar». Después abre la página pública para comprobar el resultado. Los borradores del blog y las tarifas ocultas no aparecen a los visitantes.</p>
            </div>
          </TabsContent>
          <TabsContent value="posts" forceMount className="data-[state=inactive]:hidden">
            {visitedTabs.includes("posts") && <AdminPosts />}
          </TabsContent>
          <TabsContent value="texts" forceMount className="data-[state=inactive]:hidden">
            {visitedTabs.includes("texts") && <AdminTexts />}
          </TabsContent>
          <TabsContent value="gallery" forceMount className="data-[state=inactive]:hidden">
            {visitedTabs.includes("gallery") && <AdminGallery />}
          </TabsContent>
          <TabsContent value="rates" forceMount className="data-[state=inactive]:hidden">
            {visitedTabs.includes("rates") && <AdminRates />}
          </TabsContent>
          <TabsContent value="seo" forceMount className="data-[state=inactive]:hidden">
            {visitedTabs.includes("seo") && <AdminSeo />}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
