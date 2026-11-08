import { useEffect, useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { emptyRates, isValidRate, loadRates, rateKeys, type Rates } from "@/lib/rates";
import { RatesCards } from "@/components/RatesSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const amountFields = [
  { key: "night", label: "Precio por noche desde", hint: "Obligatorio para publicar tarifas." },
  { key: "weekend", label: "Noche de fin de semana desde", hint: "Opcional. Déjalo vacío si varía según la fecha." },
  { key: "highSeason", label: "Noche de temporada alta desde", hint: "Opcional." },
  { key: "petFee", label: "Suplemento por mascota", hint: "Opcional. Déjalo vacío si se consulta en cada reserva." },
] as const;

const AdminRates = () => {
  const [rates, setRates] = useState<Rates>(emptyRates);
  const [saved, setSaved] = useState<Rates>(emptyRates);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (JSON.stringify(rates) === JSON.stringify(saved)) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [rates, saved]);

  useEffect(() => {
    let active = true;
    loadRates().then((data) => {
      if (active) { setRates(data); setSaved(data); setLoading(false); }
    }).catch(() => {
      if (active) { toast.error("No se pudieron cargar las tarifas"); setLoading(false); }
    });
    return () => { active = false; };
  }, []);

  const set = (field: keyof Rates, value: string | boolean) =>
    setRates((current) => ({ ...current, [field]: value }));

  const save = async () => {
    if (rates.published && !rates.night.trim()) return toast.error("Indica el precio por noche antes de publicar");
    if (amountFields.some(({ key }) => !isValidRate(rates[key]))) return toast.error("Revisa los importes: deben ser números positivos");
    if (rates.minNights && (!/^\d+$/.test(rates.minNights) || Number(rates.minNights) < 1)) return toast.error("La estancia mínima debe ser un número de noches válido");
    setSaving(true);
    const rows = rateKeys.map((field) => ({
      key: `rates.${field}`,
      value_es: field === "published" ? String(rates.published) : field === "noteEn" ? "" : String(rates[field]).trim(),
      value_en: field === "noteEn" ? rates.noteEn.trim() : field === "published" ? String(rates.published) : String(rates[field]).trim(),
    }));
    const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
    setSaving(false);
    if (error) return toast.error("No se pudieron guardar las tarifas");
    setSaved(rates);
    toast.success(rates.published ? "Tarifas publicadas" : "Tarifas guardadas sin publicar");
  };

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Tarifas</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">Escribe precios orientativos en euros. La web seguirá invitando a consultar disponibilidad y presupuesto por WhatsApp.</p>
      </div>
      <Card>
        <CardContent className="space-y-6 p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            {amountFields.map(({ key, label, hint }) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={`rate-${key}`}>{label} (€)</Label>
                <Input id={`rate-${key}`} type="text" inputMode="decimal" placeholder="Ej. 180" value={rates[key]} onChange={(event) => set(key, event.target.value)} />
                <p className="text-xs text-muted-foreground">{hint}</p>
              </div>
            ))}
          </div>
          <div className="max-w-xs space-y-2">
            <Label htmlFor="min-nights">Estancia mínima (noches)</Label>
            <Input id="min-nights" type="number" min="1" step="1" placeholder="Opcional" value={rates.minNights} onChange={(event) => set("minNights", event.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate-note-es">Condiciones o aclaraciones (español)</Label>
            <Textarea id="rate-note-es" rows={3} placeholder="Ej. Consulta precios para puentes y festivos." value={rates.noteEs} onChange={(event) => set("noteEs", event.target.value)} />
          </div>
          <details className="rounded border border-border p-3">
            <summary className="cursor-pointer text-sm text-muted-foreground">Versión en inglés (opcional)</summary>
            <Label htmlFor="rate-note-en" className="mt-3 block">Condiciones en inglés</Label>
            <Textarea id="rate-note-en" rows={3} className="mt-2" value={rates.noteEn} onChange={(event) => set("noteEn", event.target.value)} />
          </details>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4">
            <Switch id="rates-published" checked={rates.published} onCheckedChange={(checked) => set("published", checked)} />
            <div>
              <Label htmlFor="rates-published">Mostrar tarifas en la web</Label>
              <p className="mt-1 text-xs text-muted-foreground">Al guardar, se verán en la página de precios. Desactívalo para ocultarlas sin perder los datos.</p>
            </div>
          </div>
          <Button disabled={saving || JSON.stringify(rates) === JSON.stringify(saved)} onClick={() => void save()}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Guardar cambios
          </Button>
        </CardContent>
      </Card>
      {rates.night && isValidRate(rates.night) && (
        <div className="space-y-4 rounded-xl border border-border bg-background p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-xl">Vista previa</h3>
            <a href="/pricing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">Abrir página de precios <ExternalLink className="h-4 w-4" /></a>
          </div>
          <RatesCards rates={rates} language="es" />
          {!rates.published && <p className="text-sm text-amber-700">Vista previa: estos precios aún no aparecen en la página pública.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminRates;
