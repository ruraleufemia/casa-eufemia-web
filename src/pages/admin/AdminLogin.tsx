import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdminAuth();
  const [view, setView] = useState<"login" | "recovery">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!loading && session && isAdmin) navigate("/admin", { replace: true });
  }, [loading, session, isAdmin, navigate]);

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setBusy(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error || !data.user) {
      setBusy(false);
      setErrorMessage("No se pudo entrar. Revisa el correo y la contraseña.");
      return;
    }

    const { data: role, error: roleError } = await supabase.from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "admin")
      .maybeSingle();
    setBusy(false);
    if (roleError || !role) {
      await supabase.auth.signOut();
      setErrorMessage(roleError
        ? "No se pudieron comprobar tus permisos. Inténtalo de nuevo."
        : "Esta cuenta no tiene permisos para editar la web.");
      return;
    }
    setPassword("");
    navigate("/admin", { replace: true });
  };

  const requestRecovery = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: "https://www.casaeufemia.com/admin/reset-password",
    });
    setBusy(false);
    if (error) {
      setErrorMessage("No se pudo enviar el enlace. Inténtalo más tarde.");
      return;
    }
    setSent(true);
  };

  const changeView = (next: "login" | "recovery") => {
    setView(next);
    setErrorMessage("");
    setSent(false);
  };

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-2">
      <div className="relative hidden min-h-screen overflow-hidden bg-foreground lg:block">
        <img
          src="/silvia-maya-bienvenida-casa-rural-eufemia.jpg"
          alt="Silvia con Maya en Casa Rural Eufemia"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
        <div className="absolute bottom-12 left-12 max-w-lg text-white">
          <p className="font-display text-4xl leading-tight">Cada detalle cuenta para recibir a tus huéspedes.</p>
          <p className="mt-4 text-white/85">Tu espacio para cuidar la web de Casa Rural Eufemia.</p>
        </div>
      </div>

      <div className="flex min-h-screen flex-col px-6 py-8 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="font-display text-xl text-foreground">Casa Rural Eufemia</Link>
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Ver la web
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            {view === "login" ? <LockKeyhole className="h-6 w-6" /> : <Mail className="h-6 w-6" />}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl">{view === "login" ? "Accede al panel" : "Recupera tu acceso"}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {view === "login"
              ? "Edita textos, fotografías, experiencias y tarifas con tu cuenta administradora."
              : "Escribe el correo de tu cuenta y te enviaremos un enlace para elegir una nueva contraseña."}
          </p>

          {errorMessage && <p role="alert" className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{errorMessage}</p>}

          {view === "recovery" && sent ? (
            <div className="mt-8 space-y-5 rounded-xl border border-primary/20 bg-primary/5 p-5" role="status">
              <p className="font-medium">Revisa tu correo</p>
              <p className="text-sm text-muted-foreground">Si existe una cuenta con esa dirección, recibirás un enlace de recuperación. Comprueba también la carpeta de correo no deseado.</p>
              <Button type="button" variant="outline" onClick={() => changeView("login")}>Volver a iniciar sesión</Button>
            </div>
          ) : (
            <form onSubmit={view === "login" ? signIn : requestRecovery} className="mt-8 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Correo electrónico</Label>
                <Input id="admin-email" type="email" autoComplete="email" placeholder="tu@correo.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </div>
              {view === "login" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="admin-password">Contraseña</Label>
                    <button type="button" onClick={() => changeView("recovery")} className="text-xs text-primary hover:underline">¿La has olvidado?</button>
                  </div>
                  <div className="relative">
                    <Input id="admin-password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="pr-11" required />
                    <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}
              <Button type="submit" className="w-full" disabled={busy || loading}>
                {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {view === "login" ? "Entrar al panel" : "Enviar enlace"}
              </Button>
              {view === "recovery" && (
                <button type="button" onClick={() => changeView("login")} className="w-full text-center text-sm text-muted-foreground hover:text-primary">Volver al acceso</button>
              )}
            </form>
          )}
          <p className="mt-10 text-xs leading-relaxed text-muted-foreground">Solo las cuentas autorizadas pueden modificar la web. Si necesitas una cuenta propia, solicítala a la persona que administra el alojamiento.</p>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
