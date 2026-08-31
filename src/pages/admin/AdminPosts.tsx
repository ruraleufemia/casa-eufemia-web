import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { uploadMedia, resolveMediaUrls } from "@/lib/media";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Post = Tables<"blog_posts">;

const emptyPost = (): Partial<Post> => ({
  slug: "",
  title_es: "",
  title_en: "",
  excerpt_es: "",
  excerpt_en: "",
  content_es: "",
  content_en: "",
  image: "",
  images: [],
  sort_order: 0,
  published: true,
});

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const AdminPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [draft, setDraft] = useState<Partial<Post> | null>(null);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) toast.error("No se pudieron cargar las entradas");
    const rows = data ?? [];
    setPosts(rows);
    setPreviews(await resolveMediaUrls(rows.map((r) => r.image).filter(Boolean)));
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpload = async (file: File, field: "image" | "images") => {
    try {
      const path = await uploadMedia(file, "blog");
      setDraft((d) =>
        d
          ? field === "image"
            ? { ...d, image: path }
            : { ...d, images: [...(d.images ?? []), path] }
          : d,
      );
      toast.success("Imagen subida");
    } catch {
      toast.error("No se pudo subir la imagen");
    }
  };

  const save = async () => {
    if (!draft) return;
    const slug = draft.slug?.trim() || slugify(draft.title_es || draft.title_en || "");
    if (!slug) {
      toast.error("Añade un título");
      return;
    }
    setSaving(true);
    const payload = { ...draft, slug } as Post;
    const { error } = draft.id
      ? await supabase.from("blog_posts").update(payload).eq("id", draft.id)
      : await supabase.from("blog_posts").insert(payload);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Entrada guardada");
    setDraft(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("¿Borrar esta entrada?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Entrada borrada");
    load();
  };

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />;

  if (draft) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-light">{draft.id ? "Editar entrada" : "Nueva entrada"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Título (ES)</Label>
              <Input
                value={draft.title_es ?? ""}
                onChange={(e) => setDraft({ ...draft, title_es: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Título (EN)</Label>
              <Input
                value={draft.title_en ?? ""}
                onChange={(e) => setDraft({ ...draft, title_en: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Resumen (ES)</Label>
              <Textarea
                rows={3}
                value={draft.excerpt_es ?? ""}
                onChange={(e) => setDraft({ ...draft, excerpt_es: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Resumen (EN)</Label>
              <Textarea
                rows={3}
                value={draft.excerpt_en ?? ""}
                onChange={(e) => setDraft({ ...draft, excerpt_en: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Contenido (ES)</Label>
              <Textarea
                rows={12}
                value={draft.content_es ?? ""}
                onChange={(e) => setDraft({ ...draft, content_es: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Contenido (EN)</Label>
              <Textarea
                rows={12}
                value={draft.content_en ?? ""}
                onChange={(e) => setDraft({ ...draft, content_en: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Imagen principal</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "image")}
              />
              {draft.image && <p className="text-xs text-muted-foreground break-all">{draft.image}</p>}
            </div>
            <div className="space-y-2">
              <Label>Imágenes adicionales</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "images")}
              />
              {(draft.images ?? []).map((img) => (
                <p key={img} className="text-xs text-muted-foreground break-all">
                  {img}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <Switch
                checked={draft.published ?? true}
                onCheckedChange={(v) => setDraft({ ...draft, published: v })}
              />
              <Label>Publicada</Label>
            </div>
            <div className="flex items-center gap-3">
              <Label>Orden</Label>
              <Input
                type="number"
                className="w-24"
                value={draft.sort_order ?? 0}
                onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={save} disabled={saving} className="font-light">
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Guardar
            </Button>
            <Button variant="outline" onClick={() => setDraft(null)} className="font-light">
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Button onClick={() => setDraft(emptyPost())} className="font-light">
        <Plus className="mr-2 h-4 w-4" /> Nueva entrada
      </Button>

      {posts.length === 0 && (
        <p className="text-muted-foreground font-light">
          Aún no hay entradas creadas desde el panel. Las entradas originales de la web siguen visibles.
        </p>
      )}

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="flex items-center gap-4 p-4">
              {post.image && previews[post.image] && (
                <img
                  src={previews[post.image]}
                  alt={post.title_es}
                  className="h-16 w-16 rounded object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-light truncate">{post.title_es || post.title_en || post.slug}</p>
                <p className="text-xs text-muted-foreground">
                  {post.published ? "Publicada" : "Borrador"} · /blog/{post.slug}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setDraft(post)} className="font-light">
                Editar
              </Button>
              <Button variant="ghost" size="icon" onClick={() => remove(post.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPosts;
