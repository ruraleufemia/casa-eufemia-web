import { useEffect, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import es from "@/i18n/locales/es.json";
import en from "@/i18n/locales/en.json";
import { SEO_PAGES, type SeoPage } from "@/hooks/usePageSeo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

type Field = "title" | "description" | "keywords";
type Lang = "es" | "en";
type Values = Record<string, string>; // `${page}.${field}.${lang}`

const LIMITS: Record<Field, { max: number; hint: string }> = {
  title: { max: 60, hint: "Título que aparece en Google. Ideal: menos de 60 caracteres." },
  description: {
    max: 160,
    hint: "Resumen que aparece bajo el título en Google. Ideal: menos de 160 caracteres.",
  },
  keywords: { max: 300, hint: "Palabras clave separadas por comas." },
};

const key = (page: SeoPage, field: Field) => `seo.${page}.${field}`;

const AdminSeo = () => {
  const [values, setValues] = useState<Values>({});
  const [loading, setLoading] = useState(true);
  const [savingPage, setSavingPage] = useState<SeoPage | null>(null);

  useEffect(() => {
    (async () => {
      const base: Values = {};
      SEO_PAGES.forEach(({ page }) => {
        (["title", "description", "keywords"] as Field[]).forEach((field) => {
          base[`${page}.${field}.es`] = (es as any).seo?.[page]?.[field] ?? "";
          base[`${page}.${field}.en`] = (en as any).seo?.[page]?.[field] ?? "";
        });
      });

      const { data } = await supabase
        .from("site_content")
        .select("key, value_es, value_en")
        .like("key", "seo.%");

      data?.forEach((row) => {
        const [, page, field] = row.key.split(".");
        if (!page || !field) return;
        if (row.value_es) base[`${page}.${field}.es`] = row.value_es;
        if (row.value_en) base[`${page}.${field}.en`] = row.value_en;
      });

      setValues(base);
      setLoading(false);
    })();
  }, []);

  const set = (page: SeoPage, field: Field, lang: Lang, value: string) =>
    setValues((v) => ({ ...v, [`${page}.${field}.${lang}`]: value }));

  const savePage = async (page: SeoPage) => {
    setSavingPage(page);
    const rows = (["title", "description", "keywords"] as Field[]).map((field) => ({
      key: key(page, field),
      value_es: values[`${page}.${field}.es`] ?? "",
      value_en: values[`${page}.${field}.en`] ?? "",
    }));
    const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
    setSavingPage(null);
    if (error) return toast.error(error.message);
    toast.success("SEO guardado. Se aplicará al recargar la web.");
  };

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />;

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground font-light max-w-2xl">
        Edita cómo se ve cada página en Google y al compartirla en redes sociales. Escribe textos
        claros que incluyan lo que buscarían tus huéspedes (por ejemplo: “casa rural con piscina en
        Ciudad Real”).
      </p>

      <Tabs defaultValue={SEO_PAGES[0].page}>
        <TabsList className="mb-6 flex-wrap h-auto">
          {SEO_PAGES.map(({ page, label }) => (
            <TabsTrigger key={page} value={page}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {SEO_PAGES.map(({ page, label, path }) => (
          <TabsContent key={page} value={page} className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-light flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  Vista previa en Google
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border bg-background p-4 max-w-xl">
                  <p className="text-xs text-muted-foreground">
                    casaeufemia.com{path === "/" ? "" : path}
                  </p>
                  <p className="text-[#1a0dab] text-lg leading-snug truncate">
                    {values[`${page}.title.es`] || `Casa Eufemia — ${label}`}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {values[`${page}.description.es`]}
                  </p>
                </div>
              </CardContent>
            </Card>

            {(["title", "description", "keywords"] as Field[]).map((field) => (
              <Card key={field}>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <p className="text-sm">
                      {field === "title"
                        ? "Título de la página"
                        : field === "description"
                          ? "Descripción"
                          : "Palabras clave"}
                    </p>
                    <p className="text-xs text-muted-foreground font-light">{LIMITS[field].hint}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {(["es", "en"] as Lang[]).map((lang) => {
                      const value = values[`${page}.${field}.${lang}`] ?? "";
                      const over = value.length > LIMITS[field].max;
                      return (
                        <div key={lang} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">
                              {lang === "es" ? "Español" : "Inglés"}
                            </Label>
                            <span
                              className={`text-xs ${over ? "text-destructive" : "text-muted-foreground"}`}
                            >
                              {value.length}/{LIMITS[field].max}
                            </span>
                          </div>
                          {field === "title" ? (
                            <Input
                              value={value}
                              onChange={(e) => set(page, field, lang, e.target.value)}
                            />
                          ) : (
                            <Textarea
                              rows={field === "keywords" ? 3 : 3}
                              value={value}
                              onChange={(e) => set(page, field, lang, e.target.value)}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              className="font-light"
              disabled={savingPage === page}
              onClick={() => savePage(page)}
            >
              {savingPage === page && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Guardar SEO de {label}
            </Button>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminSeo;
