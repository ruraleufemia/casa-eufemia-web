import { useEffect, useMemo, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import es from "@/i18n/locales/es.json";
import en from "@/i18n/locales/en.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

type Dict = Record<string, unknown>;

const flatten = (obj: Dict, prefix = ""): Record<string, string> =>
  Object.entries(obj).reduce<Record<string, string>>((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") acc[path] = value;
    else if (value && typeof value === "object" && !Array.isArray(value))
      Object.assign(acc, flatten(value as Dict, path));
    return acc;
  }, {});

const baseEs = flatten(es as Dict);
const baseEn = flatten(en as Dict);

const AdminTexts = () => {
  const [values, setValues] = useState<Record<string, { es: string; en: string }>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_content").select("key, value_es, value_en");
      const overrides: Record<string, { es: string; en: string }> = {};
      Object.keys(baseEs).forEach((key) => {
        overrides[key] = { es: baseEs[key] ?? "", en: baseEn[key] ?? "" };
      });
      data?.forEach((row) => {
        overrides[row.key] = {
          es: row.value_es || overrides[row.key]?.es || "",
          en: row.value_en || overrides[row.key]?.en || "",
        };
      });
      setValues(overrides);
      setLoading(false);
    })();
  }, []);

  const keys = useMemo(() => {
    const all = Object.keys(values);
    const q = query.trim().toLowerCase();
    if (!q) return all.slice(0, 60);
    return all.filter(
      (key) =>
        key.toLowerCase().includes(q) ||
        (values[key]?.es ?? "").toLowerCase().includes(q) ||
        (values[key]?.en ?? "").toLowerCase().includes(q),
    );
  }, [values, query]);

  const save = async (key: string) => {
    setSavingKey(key);
    const { error } = await supabase
      .from("site_content")
      .upsert({ key, value_es: values[key].es, value_en: values[key].en }, { onConflict: "key" });
    setSavingKey(null);
    if (error) return toast.error(error.message);
    toast.success("Texto guardado");
  };

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />;

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Buscar texto o sección (ej. hero, precios...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {!query && (
        <p className="text-sm text-muted-foreground font-light">
          Mostrando los primeros 60 textos. Usa el buscador para encontrar cualquier otro.
        </p>
      )}

      <div className="grid gap-4">
        {keys.map((key) => (
          <Card key={key}>
            <CardContent className="p-4 space-y-3">
              <p className="text-xs font-mono text-muted-foreground">{key}</p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Español</Label>
                  <Textarea
                    rows={2}
                    value={values[key].es}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [key]: { ...v[key], es: e.target.value } }))
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Inglés</Label>
                  <Textarea
                    rows={2}
                    value={values[key].en}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [key]: { ...v[key], en: e.target.value } }))
                    }
                  />
                </div>
              </div>
              <Button
                size="sm"
                className="font-light"
                disabled={savingKey === key}
                onClick={() => save(key)}
              >
                {savingKey === key && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Guardar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminTexts;
