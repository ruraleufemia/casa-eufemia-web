import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminPosts from "./AdminPosts";
import AdminTexts from "./AdminTexts";
import AdminGallery from "./AdminGallery";

const Admin = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdminAuth();

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
            <h1 className="text-2xl font-light tracking-tight">Panel de administración</h1>
            <p className="text-sm text-muted-foreground font-light">{session.user.email}</p>
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

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="posts">
          <TabsList className="mb-8">
            <TabsTrigger value="posts">Blog</TabsTrigger>
            <TabsTrigger value="texts">Textos</TabsTrigger>
            <TabsTrigger value="gallery">Galería</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <AdminPosts />
          </TabsContent>
          <TabsContent value="texts">
            <AdminTexts />
          </TabsContent>
          <TabsContent value="gallery">
            <AdminGallery />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
