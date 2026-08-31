import { useEffect, useState } from "react";
import { Loader2, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { resolveMediaUrls, uploadMedia } from "@/lib/media";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Image = Tables<"gallery_images">;

const AdminGallery = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    const rows = data ?? [];
    setImages(rows);
    setPreviews(await resolveMediaUrls(rows.map((r) => r.url)));
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const path = await uploadMedia(file, "gallery");
        const { error } = await supabase
          .from("gallery_images")
          .insert({ url: path, sort_order: images.length });
        if (error) throw error;
      }
      toast.success("Imágenes subidas");
      await load();
    } catch {
      toast.error("No se pudieron subir las imágenes");
    }
    setUploading(false);
  };

  const update = async (id: string, patch: Partial<Image>) => {
    setImages((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    const { error } = await supabase.from("gallery_images").update(patch).eq("id", id);
    if (error) toast.error(error.message);
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

      <p className="text-sm text-muted-foreground font-light">
        Estas imágenes se añaden a las que ya existen en la galería de la web.
      </p>

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
                defaultValue={image.alt_es}
                onBlur={(e) => update(image.id, { alt_es: e.target.value })}
              />
              <Input
                placeholder="Descripción (EN)"
                defaultValue={image.alt_en}
                onBlur={(e) => update(image.id, { alt_en: e.target.value })}
              />
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  className="w-24"
                  defaultValue={image.sort_order}
                  onBlur={(e) => update(image.id, { sort_order: Number(e.target.value) })}
                />
                <Button variant="ghost" size="icon" onClick={() => remove(image.id)}>
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
