import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const AdminResetPassword = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;

    // Newer recovery links arrive with a PKCE ?code= param; older ones with #type=recovery.
    const hash = window.location.hash;
    const code = new URLSearchParams(window.location.search).get("code");

    if (hash.includes("type=recovery")) {
      setReady(true);
      return;
    }

    if (code) {
      supabase.auth
        .exchangeCodeForSession(code)
        .then(({ error }) => {
          if (!active) return;
          if (error) {
            toast.error("El enlace ha caducado o ya se ha usado. Solicita uno nuevo.");
            return;
          }
          setReady(true);
          // Clean the code from the URL.
          window.history.replaceState(null, "", window.location.pathname);
        });
      return;
    }

    // Also handle the event in case the session arrives after mount.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" && active) setReady(true);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Contraseña actualizada");
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-light tracking-tight">Nueva contraseña</CardTitle>
          <CardDescription>
            {ready
              ? "Introduce tu nueva contraseña de administrador."
              : "Abre esta página desde el enlace del correo de recuperación."}
          </CardDescription>
        </CardHeader>
        {ready && (
          <CardContent>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Nueva contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Repite la contraseña</Label>
                <Input
                  id="confirm"
                  type="password"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  minLength={6}
                  required
                />
              </div>
              <Button type="submit" className="w-full font-light" disabled={busy}>
                {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Guardar contraseña
              </Button>
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default AdminResetPassword;
