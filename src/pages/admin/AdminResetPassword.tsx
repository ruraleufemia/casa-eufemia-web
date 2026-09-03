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
  const [checking, setChecking] = useState(true);
  const [linkError, setLinkError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;

    const markReady = () => {
      if (!active) return;
      setReady(true);
      setChecking(false);
      setLinkError(false);
      window.history.replaceState(null, "", window.location.pathname);
    };

    const markInvalid = () => {
      if (!active) return;
      setChecking(false);
      setLinkError(true);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (active && session && (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN")) {
        markReady();
      }
    });

    const prepareRecovery = async () => {
      const search = new URLSearchParams(window.location.search);
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const urlError = search.get("error_description") ?? hash.get("error_description");
      const code = search.get("code");
      const tokenHash = search.get("token_hash");
      const type = search.get("type") ?? hash.get("type");

      if (urlError) {
        markInvalid();
        return;
      }

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) markInvalid();
        else markReady();
        return;
      }

      if (tokenHash && type === "recovery") {
        const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: "recovery" });
        if (error) markInvalid();
        else markReady();
        return;
      }

      // For links containing #access_token, the auth client restores the session
      // asynchronously. getSession waits until that URL processing has finished.
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) markInvalid();
      else markReady();
    };

    void prepareRecovery();

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
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      setBusy(false);
      setReady(false);
      setLinkError(true);
      toast.error("La sesión de recuperación ha caducado. Solicita un enlace nuevo.");
      return;
    }
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
              : checking
                ? "Validando el enlace de recuperación…"
                : "Abre esta página desde un enlace de recuperación válido."}
          </CardDescription>
        </CardHeader>
        {checking && (
          <CardContent className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Validando enlace" />
          </CardContent>
        )}
        {linkError && !checking && (
          <CardContent className="space-y-4">
            <p className="text-sm text-destructive">
              Este enlace ha caducado, ya se ha utilizado o no es válido. Solicita uno nuevo desde el acceso privado.
            </p>
            <Button type="button" variant="outline" className="w-full" onClick={() => navigate("/admin/login")}>
              Volver al acceso privado
            </Button>
          </CardContent>
        )}
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
