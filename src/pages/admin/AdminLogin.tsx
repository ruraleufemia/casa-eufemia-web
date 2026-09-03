import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdminAuth();
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.functions
      .invoke("admin-bootstrap", { method: "GET" })
      .then(({ data }) => setHasAdmin(Boolean((data as { hasAdmin?: boolean })?.hasAdmin)))
      .catch(() => setHasAdmin(true));
  }, []);

  useEffect(() => {
    if (!loading && session && isAdmin) navigate("/admin", { replace: true });
  }, [loading, session, isAdmin, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      toast.error("No se pudo iniciar sesión: credenciales incorrectas");
      return;
    }
    navigate("/admin", { replace: true });
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    if (signUpError && !signUpError.message.includes("already registered")) {
      setBusy(false);
      toast.error(signUpError.message);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setBusy(false);
      toast.info("Cuenta creada. Confirma tu correo y vuelve a iniciar sesión.");
      return;
    }

    const { error } = await supabase.functions.invoke("admin-bootstrap", { method: "POST" });
    setBusy(false);
    if (error) {
      toast.error("No se pudo crear el administrador");
      return;
    }
    toast.success("Administrador creado");
    navigate("/admin", { replace: true });
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Escribe tu correo electrónico para restablecer la contraseña");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Te hemos enviado un correo para restablecer la contraseña");
  };

  const creating = hasAdmin === false;

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-light tracking-tight">
            {creating ? "Crear administrador" : "Área privada"}
          </CardTitle>
          <CardDescription>
            {creating
              ? "No hay ningún administrador todavía. Crea la única cuenta de acceso."
              : "Introduce tus credenciales para gestionar la web."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={creating ? handleCreateAdmin : handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                autoComplete={creating ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>
            <Button type="submit" className="w-full font-light" disabled={busy || hasAdmin === null}>
              {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {creating ? "Crear cuenta de administrador" : "Entrar"}
            </Button>
            {!creating && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleResetPassword}
                disabled={busy}
                className="w-full text-muted-foreground font-light"
              >
                ¿Olvidaste tu contraseña?
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
