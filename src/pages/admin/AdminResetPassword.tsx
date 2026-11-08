import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, LockKeyhole } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    let recovered = false;
    const search = new URLSearchParams(window.location.search);
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const code = search.get("code");
    const tokenHash = search.get("token_hash");
    const type = search.get("type") ?? hash.get("type");
    const hasRecoveryLink = Boolean(code || (tokenHash && type === "recovery") || (hash.get("access_token") && type === "recovery"));

    const markReady = () => {
      if (!active) return;
      recovered = true;
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
      if (active && session && (event === "PASSWORD_RECOVERY" || (hasRecoveryLink && event === "SIGNED_IN"))) {
        markReady();
      }
    });

    const prepareRecovery = async () => {
      const urlError = search.get("error_description") ?? hash.get("error_description");

      if (urlError) {
        markInvalid();
        return;
      }

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        // The auth client may already have exchanged the URL code on startup.
        if (error) {
          const { data } = await supabase.auth.getSession();
          if (data.session) markReady();
          else markInvalid();
        } else markReady();
        return;
      }

      if (tokenHash && type === "recovery") {
        const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: "recovery" });
        if (error) markInvalid();
        else markReady();
        return;
      }

      if (!hasRecoveryLink && !recovered) {
        markInvalid();
        return;
      }

      // For recovery links containing #access_token, wait for URL processing.
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) { if (!recovered) markInvalid(); }
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
    <main className="grid min-h-screen bg-background lg:grid-cols-2">
      <div className="relative hidden min-h-screen overflow-hidden bg-foreground lg:block">
        <img src="/silvia-maya-bienvenida-casa-rural-eufemia.jpg" alt="Silvia y Maya en Casa Rural Eufemia" className="absolute inset-0 h-full w-full object-cover object-[center_35%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
        <p className="absolute bottom-12 left-12 max-w-lg font-display text-4xl leading-tight text-white">Vuelve a cuidar cada detalle de la web.</p>
      </div>
      <div className="flex min-h-screen flex-col px-6 py-8 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="font-display text-xl text-foreground">Casa Rural Eufemia</Link>
          <Link to="/admin/login" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" /> Volver al acceso</Link>
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><LockKeyhole className="h-6 w-6" /></div>
          <h1 className="font-display text-3xl sm:text-4xl">Nueva contraseña</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {ready ? "Elige una contraseña de al menos 12 caracteres para tu cuenta." : checking ? "Validando el enlace de recuperación…" : "Necesitas un enlace de recuperación válido."}
          </p>
          {checking && <Loader2 className="mt-8 h-6 w-6 animate-spin text-primary" aria-label="Validando enlace" />}
          {linkError && !checking && (
            <div className="mt-8 space-y-4">
              <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">El enlace ha caducado, ya se ha utilizado o no es válido. Solicita otro desde el acceso privado.</p>
              <Button type="button" variant="outline" onClick={() => navigate("/admin/login")}>Volver al acceso</Button>
            </div>
          )}
          {ready && (
            <form onSubmit={handleUpdate} className="mt-8 space-y-5">
              <div className="space-y-2"><Label htmlFor="password">Nueva contraseña</Label><Input id="password" type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={12} required /></div>
              <div className="space-y-2"><Label htmlFor="confirm">Repite la contraseña</Label><Input id="confirm" type="password" autoComplete="new-password" value={confirm} onChange={(event) => setConfirm(event.target.value)} minLength={12} required /></div>
              <Button type="submit" className="w-full" disabled={busy}>{busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Guardar contraseña</Button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminResetPassword;
