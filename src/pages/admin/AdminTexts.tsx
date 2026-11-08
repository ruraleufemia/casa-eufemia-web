import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Loader2, RotateCcw, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import es from "@/i18n/locales/es.json";
import en from "@/i18n/locales/en.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

type Translations = Record<string, { es: string; en: string }>;
type Group = { name: string; path: string; fields: [string, string][] };

const flatten = (obj: Record<string, unknown>, prefix = ""): Record<string, string> =>
  Object.entries(obj).reduce<Record<string, string>>((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") acc[path] = value;
    else if (value && typeof value === "object" && !Array.isArray(value))
      Object.assign(acc, flatten(value as Record<string, unknown>, path));
    return acc;
  }, {});

const baseEs = flatten(es as Record<string, unknown>);
const baseEn = flatten(en as Record<string, unknown>);
const groups: Group[] = [
  { name: "Bienvenida", path: "/#about", fields: [
    ["about.title", "Título de bienvenida"], ["about.welcomeHeading", "Frase principal"],
    ["about.welcomeP1", "Primer párrafo"], ["about.welcomeP2", "Cómo es la casa"],
    ["about.welcomeP3", "Silvia y la ubicación"], ["about.welcomeSignoff", "Frase final"],
    ["about.welcomeImageAlt", "Descripción de la foto"],
    ["about.welcomeImageCaption", "Pie de foto"],
    ["about.capacity", "Capacidad · cifra principal"], ["about.maxCapacity", "Capacidad · detalle"],
    ["about.bedrooms", "Dormitorios · cifra principal"], ["about.comfortableBedrooms", "Dormitorios · detalle"],
    ["about.location", "Ubicación · título"], ["about.inTheHeart", "Ubicación · detalle"],
  ] },
  { name: "Entorno", path: "/#entorno", fields: [
    ["localSeo.eyebrow", "Etiqueta"], ["localSeo.title", "Título"],
    ["localSeo.intro", "Introducción"],
    ["localSeo.tomelloso.title", "Tomelloso · título"],
    ["localSeo.tomelloso.description", "Tomelloso · descripción"],
    ["localSeo.quijote.title", "Ruta del Quijote · título"],
    ["localSeo.quijote.description", "Ruta del Quijote · descripción"],
    ["localSeo.ruidera.title", "Lagunas de Ruidera · título"],
    ["localSeo.ruidera.description", "Lagunas de Ruidera · descripción"],
    ["localSeo.groups.title", "Familias y grupos · título"],
    ["localSeo.groups.description", "Familias y grupos · descripción"],
  ] },
  { name: "Servicios", path: "/#amenities", fields: [
    ["amenities.title", "Título"], ["amenities.subtitle", "Subtítulo"],
    ["amenities.garden", "Jardín · título"], ["amenities.gardenDesc", "Jardín · descripción"],
    ["amenities.pool", "Piscina · título"], ["amenities.poolDesc", "Piscina · descripción"],
    ["amenities.acDesc", "Aire acondicionado"], ["amenities.wifiDesc", "WiFi"],
    ["amenities.kitchenDesc", "Cocina"], ["amenities.outdoorDesc", "Zona exterior"],
    ["amenities.bathroomsTitle", "Baños · título"], ["amenities.bathroomsDesc", "Baños · descripción"],
    ["amenities.petsTitle", "Mascotas · título"], ["amenities.petsDesc", "Mascotas · descripción"],
  ] },
  { name: "Galería y blog", path: "/gallery", fields: [
    ["gallery.title", "Título de galería en inicio"],
    ["gallery.subtitle", "Descripción de galería"],
    ["blog.title", "Título de experiencias en inicio"],
    ["blog.subtitle", "Descripción de experiencias"],
    ["blogPage.title", "Título de la página de blog"],
    ["blogPage.subtitle", "Introducción de la página de blog"],
  ] },
  { name: "Reservas y contacto", path: "/pricing", fields: [
    ["pricing.title", "Título de precios"], ["pricing.subtitle", "Introducción"],
    ["pricing.directBookingNote", "Ventaja de reservar directamente"],
    ["pricing.locationTitle", "Título de ubicación"], ["pricing.address", "Dirección"],
    ["contact.title", "Título del formulario"],
    ["contact.subtitle", "Introducción del formulario"],
    ["footer.tagline", "Frase del pie de página"],
  ] },
  { name: "Reseñas", path: "/#opiniones", fields: [
    ["reviews.title", "Título de las reseñas"],
    ["reviews.subtitle", "Introducción"],
    ["reviews.ctaText", "Invitación a dejar una reseña"],
  ] },
];

const AdminTexts = () => {
  const [values, setValues] = useState<Translations>({});
  const [saved, setSaved] = useState<Translations>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [groupName, setGroupName] = useState(groups[0].name);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase.from("site_content").select("key, value_es, value_en");
      if (!active) return;
      if (error) toast.error("No se pudieron cargar los textos");
      const rows: Translations = {};
      Object.keys(baseEs).forEach((key) => {
        rows[key] = { es: baseEs[key] ?? "", en: baseEn[key] ?? "" };
      });
      data?.forEach((row) => {
        if (row.key in rows) rows[row.key] = {
          es: row.value_es || rows[row.key].es,
          en: row.value_en || rows[row.key].en,
        };
      });
      setValues(rows);
      setSaved(rows);
      setLoading(false);
    })();
    return () => { active = false; };
  }, []);

  const dirtyCount = Object.keys(values).filter((key) =>
    values[key]?.es !== saved[key]?.es || values[key]?.en !== saved[key]?.en,
  ).length;

  useEffect(() => {
    if (!dirtyCount) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirtyCount]);

  const selected = groups.find((group) => group.name === groupName) ?? groups[0];
  const fields = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("es");
    const options = q ? groups.flatMap((group) => group.fields) : selected.fields;
    return options.filter(([key, label]) => !q ||
      [label, values[key]?.es, values[key]?.en].some((part) => part?.toLocaleLowerCase("es").includes(q)));
  }, [query, selected, values]);

  const set = (key: string, lang: "es" | "en", value: string) =>
    setValues((current) => ({ ...current, [key]: { ...current[key], [lang]: value } }));

  const save = async (key: string) => {
    if (!values[key]?.es.trim()) return toast.error("El texto en español no puede estar vacío");
    setSavingKey(key);
    const next = values[key];
    const { error } = await supabase.from("site_content")
      .upsert({ key, value_es: next.es.trim(), value_en: next.en.trim() }, { onConflict: "key" });
    setSavingKey(null);
    if (error) return toast.error("No se pudo guardar el texto");
    setSaved((previous) => ({ ...previous, [key]: next }));
    toast.success("Texto publicado. Se verá al recargar la web.");
  };

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Textos de la web</h2>
        <p className="mt-1 text-sm text-muted-foreground">Elige una sección y cambia solo el texto que necesitas. Guarda cada bloque por separado.</p>
        {dirtyCount > 0 && <p className="mt-2 text-sm font-medium text-amber-700">{dirtyCount} {dirtyCount === 1 ? "texto sin guardar" : "textos sin guardar"}</p>}
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Sección de textos">
        {groups.map((group) => (
          <Button key={group.name} variant={groupName === group.name ? "default" : "outline"} size="sm" onClick={() => { setGroupName(group.name); setQuery(""); }}>
            {group.name}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input className="pl-9" aria-label="Buscar un texto" placeholder="Buscar un texto..." value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
        {!query && <a href={selected.path} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">Ver sección en la web <ExternalLink className="h-4 w-4" /></a>}
      </div>
      {fields.length === 0 && <p className="text-sm text-muted-foreground">No hay textos con ese nombre.</p>}
      <div className="grid gap-4">
        {fields.map(([key, label]) => {
          const value = values[key];
          if (!value) return null;
          const changed = value.es !== saved[key]?.es || value.en !== saved[key]?.en;
          return (
            <Card key={key}>
              <CardContent className="space-y-3 p-5">
                <Label htmlFor={`text-${key}`} className="text-base font-medium">{label}</Label>
                <Textarea id={`text-${key}`} rows={value.es.length > 150 ? 4 : 2} value={value.es} onChange={(event) => set(key, "es", event.target.value)} />
                <details className="rounded border border-border px-3 py-2">
                  <summary className="cursor-pointer text-sm text-muted-foreground">Versión en inglés (opcional)</summary>
                  <Label htmlFor={`en-${key}`} className="mt-3 block text-sm">Texto en inglés</Label>
                  <Textarea id={`en-${key}`} rows={3} className="mt-2" value={value.en} onChange={(event) => set(key, "en", event.target.value)} />
                </details>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" disabled={!changed || savingKey === key} onClick={() => void save(key)}>
                    {savingKey === key && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Guardar texto
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setValues((current) => ({ ...current, [key]: { es: baseEs[key], en: baseEn[key] } }))}>
                    <RotateCcw className="mr-2 h-4 w-4" /> Restaurar original
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminTexts;
