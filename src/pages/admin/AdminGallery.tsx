import { useEffect, useState } from "react";
import { Loader2, RotateCcw, Save, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { resolveMediaUrl, resolveMediaUrls, uploadMedia } from "@/lib/media";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import es from "@/i18n/locales/es.json";

type Image = Tables<"gallery_images">;

const AdminGallery = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [savedImages, setSavedImages] = useState<Record<string, Image>>({});
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [welcomePath, setWelcomePath] = useState(es.about.welcomeImage);
  const [savedWelcomePath, setSavedWelcomePath] = useState(es.about.welcomeImage);
  const [welcomePreview, setWelcomePreview] = useState(es.about.welcomeImage);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);

  const load = async () => {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) toast.error("No se pudo cargar la galería");
    const rows = data ?? [];
    setImages(rows);
    setSavedImages(Object.fromEntries(rows.map((row) => [row.id, row])));
    setPreviews(await resolveMediaUrls(rows.map((r) => r.url)));
    setLoading(false);
  };

  useEffect(() => {
    void load();
    supabase.from("site_content").select("value_es").eq("key", "about.welcomeImage").maybeSingle()
      .then(async ({ data }) => {
        const path = data?.value_es || es.about.welcomeImage;
        setWelcomePath(path);
        setSavedWelcomePath(path);
        setWelcomePreview(await resolveMediaUrl(path));
      });
  }, []);

  const uploadWelcome = async (file: File) => {
    setUploading(true);
    try {
      const path = await uploadMedia(file, "welcome");
      setWelcomePath(path);
      setWelcomePreview(await resolveMediaUrl(path));
      toast.info("Foto subida. Pulsa «Publicar foto» para mostrarla en la web.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo subir la foto");
    } finally {
      setUploading(false);
    }
  };

  const saveWelcome = async () => {
    setSaving("welcome");
    const { error } = await supabase.from("site_content").upsert({
      key: "about.welcomeImage", value_es: welcomePath, value_en: welcomePath,
    }, { onConflict: "key" });
    setSaving(null);
    if (error) return toast.error("No se pudo publicar la foto");
    setSavedWelcomePath(welcomePath);
    toast.success("Foto de bienvenida publicada");
  };

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    try {
      for (const [index, file] of Array.from(files).entries()) {
        const path = await uploadMedia(file, "gallery");
        const { error } = await supabase
          .from("gallery_images")
          .insert({
            url: path, sort_order: images.length + index,
            alt_es: file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
          });
        if (error) throw error;
      }
      toast.success("Imágenes subidas. Revisa y guarda sus descripciones.");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudieron subir las imágenes");
    }
    setUploading(false);
  };

  const update = (id: string, patch: Partial<Image>) => {
    setImages((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  };

  const saveImage = async (image: Image) => {
    if (!image.alt_es.trim()) return toast.error("Añade una descripción en español");
    setSaving(image.id);
    const { error } = await supabase.from("gallery_images")
      .update({ alt_es: image.alt_es.trim(), alt_en: image.alt_en.trim(), sort_order: image.sort_order })
      .eq("id", image.id);
    setSaving(null);
    if (error) return toast.error("No se pudo guardar la imagen");
    setSavedImages((prev) => ({ ...prev, [image.id]: image }));
    toast.success("Descripción y orden guardados");
  };

  const remove = async (id: string) => {
    if (!confirm("¿Borrar esta imagen?")) return;
    const { error } = await supabase.from("gallery_images").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="grid gap-6 p-5 md:grid-cols-[minmax(0,240px)_1fr] md:items-center">
          <img src={welcomePreview} alt="Foto actual de bienvenida" className="h-64 w-full rounded-lg object-cover" />
          <div className="space-y-3">
            <h2 className="font-display text-xl">Foto de bienvenida de la portada</h2>
            <p className="text-sm text-muted-foreground">Esta foto aparece junto al texto «Bienvenidos». Súbela y publícala cuando estés conforme.</p>
            <Label htmlFor="welcome-upload">Elegir otra foto</Label>
            <Input id="welcome-upload" type="file" accept="image/*" disabled={uploading} onChange={(e) => e.target.files?.[0] && void uploadWelcome(e.target.files[0])} />
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => void saveWelcome()} disabled={uploading || saving === "welcome" || welcomePath === savedWelcomePath}>
                <Save className="mr-2 h-4 w-4" /> Publicar foto
              </Button>
              <Button variant="outline" onClick={() => { setWelcomePath(es.about.welcomeImage); setWelcomePreview(es.about.welcomeImage); }} disabled={uploading}>
                <RotateCcw className="mr-2 h-4 w-4" /> Usar foto original
              </Button>
            </div>
            {welcomePath !== savedWelcomePath && <p className="text-sm text-amber-700">Hay una foto pendiente de publicar.</p>}
          </div>
        </CardContent>
      </Card>
      <div>
        <h2 className="font-display text-xl">Fotos adicionales de la galería</h2>
        <p className="mt-1 text-sm text-muted-foreground">Las nuevas fotos se añaden a la galería. Las fotos incluidas originalmente en la web se mantienen.</p>
      </div>
      <div className="space-y-2 max-w-md">
        <Label htmlFor="gallery-upload">Subir imágenes</Label>
        <Input
          id="gallery-upload"
          type="file"
          accept="image/*"
          multiple
          disabled={uploading}
          onChange={(e) => e.target.files?.length && handleFiles(e.target.files)}
        />
        {uploading && (
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Upload className="h-4 w-4 animate-pulse" /> Subiendo...
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <Card key={image.id}>
            <CardContent className="p-4 space-y-3">
              {previews[image.url] && (
                <img
                  src={previews[image.url]}
                  alt={image.alt_es}
                  className="h-40 w-full rounded object-cover"
                />
              )}
              <Input
                placeholder="Descripción (ES)"
                aria-label="Descripción de la foto en español"
                value={image.alt_es}
                onChange={(e) => update(image.id, { alt_es: e.target.value })}
              />
              <Input
                placeholder="Descripción (EN)"
                aria-label="Descripción de la foto en inglés"
                value={image.alt_en}
                onChange={(e) => update(image.id, { alt_en: e.target.value })}
              />
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  className="w-24"
                  aria-label="Orden de la foto"
                  value={image.sort_order}
                  onChange={(e) => update(image.id, { sort_order: Number(e.target.value || 0) })}
                />
                <Button onClick={() => void saveImage(image)} disabled={saving === image.id || JSON.stringify(savedImages[image.id]) === JSON.stringify(image)}>
                  <Save className="mr-2 h-4 w-4" /> Guardar
                </Button>
                <Button variant="ghost" size="icon" aria-label="Eliminar foto" onClick={() => void remove(image.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;
