import { useEffect, useState } from "react";
import { ExternalLink, Loader2, Plus, Trash2 } from "lucide-react";
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
import { blogPosts as originalPosts } from "@/data/blogPosts";

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
  published: false,
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
  const [originalDraft, setOriginalDraft] = useState<Partial<Post> | null>(null);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!draft || JSON.stringify(draft) === JSON.stringify(originalDraft)) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [draft, originalDraft]);

  const load = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) toast.error("No se pudieron cargar las entradas");
    const rows = data ?? [];
    setPosts(rows);
    setPreviews(await resolveMediaUrls(rows.flatMap((r) => [r.image, ...(r.images ?? [])]).filter(Boolean)));
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const edit = (post: Partial<Post>) => {
    setDraft({ ...post });
    setOriginalDraft({ ...post });
  };

  const cancel = () => {
    if (JSON.stringify(draft) !== JSON.stringify(originalDraft) && !confirm("Tienes cambios sin guardar. ¿Quieres descartarlos?")) return;
    setDraft(null);
    setOriginalDraft(null);
  };

  const handleUpload = async (file: File, field: "image" | "images") => {
    try {
      const path = await uploadMedia(file, "blog");
      const media = await resolveMediaUrls([path]);
      setPreviews((current) => ({ ...current, ...media }));
      setDraft((d) =>
        d
          ? field === "image"
            ? { ...d, image: path }
            : { ...d, images: [...(d.images ?? []), path] }
          : d,
      );
      toast.success("Imagen subida");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo subir la imagen");
    }
  };

  const save = async () => {
    if (!draft) return;
    const slug = draft.slug?.trim() || slugify(draft.title_es || draft.title_en || "");
    if (!draft.title_es?.trim()) return toast.error("Añade un título en español");
    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return toast.error("La dirección solo puede contener letras, números y guiones");
    if (!draft.id && originalPosts.some((post) => post.slug === slug)) return toast.error("Ya existe un artículo original con esa dirección");
    if (draft.published && (!draft.excerpt_es?.trim() || !draft.content_es?.trim() || !draft.image)) {
      return toast.error("Para publicar añade resumen, contenido y foto principal");
    }
    setSaving(true);
    const payload = {
      slug,
      title_es: draft.title_es.trim(), title_en: draft.title_en?.trim() || "",
      excerpt_es: draft.excerpt_es?.trim() || "", excerpt_en: draft.excerpt_en?.trim() || "",
      content_es: draft.content_es?.trim() || "", content_en: draft.content_en?.trim() || "",
      image: draft.image || "", images: draft.images || [],
      published: draft.published ?? false, sort_order: draft.sort_order ?? 0,
    };
    const { error } = draft.id
      ? await supabase.from("blog_posts").update(payload).eq("id", draft.id)
      : await supabase.from("blog_posts").insert(payload);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(payload.published ? "Entrada publicada" : "Borrador guardado");
    setDraft(null);
    setOriginalDraft(null);
    void load();
  };

  const remove = async (id: string) => {
    if (!confirm("¿Eliminar esta entrada del blog? Esta acción no se puede deshacer.")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Entrada borrada");
    void load();
  };

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />;

  if (draft) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-light">{draft.id ? "Editar entrada" : "Nueva entrada"}</CardTitle>
          <p className="text-sm text-muted-foreground">Escribe primero el contenido en español. Puedes guardar un borrador y publicarlo más adelante.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="post-title">Título *</Label>
              <Input
                id="post-title"
                value={draft.title_es ?? ""}
                onChange={(e) => setDraft({ ...draft, title_es: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="post-excerpt">Resumen *</Label>
              <Textarea
                id="post-excerpt"
                rows={3}
                value={draft.excerpt_es ?? ""}
                onChange={(e) => setDraft({ ...draft, excerpt_es: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="post-content">Contenido *</Label>
              <Textarea
                id="post-content"
                rows={12}
                value={draft.content_es ?? ""}
                onChange={(e) => setDraft({ ...draft, content_es: e.target.value })}
              />
            </div>
            <p className="text-xs text-muted-foreground">Separa párrafos con una línea en blanco. Usa ## para un subtítulo y - para una lista.</p>
          </div>

          <details className="rounded-lg border border-border p-4">
            <summary className="cursor-pointer font-medium">Traducción al inglés (opcional)</summary>
            <div className="mt-4 grid gap-4">
              <div><Label htmlFor="post-title-en">Título en inglés</Label><Input id="post-title-en" className="mt-2" value={draft.title_en ?? ""} onChange={(e) => setDraft({ ...draft, title_en: e.target.value })} /></div>
              <div><Label htmlFor="post-excerpt-en">Resumen en inglés</Label><Textarea id="post-excerpt-en" className="mt-2" rows={3} value={draft.excerpt_en ?? ""} onChange={(e) => setDraft({ ...draft, excerpt_en: e.target.value })} /></div>
              <div><Label htmlFor="post-content-en">Contenido en inglés</Label><Textarea id="post-content-en" className="mt-2" rows={8} value={draft.content_en ?? ""} onChange={(e) => setDraft({ ...draft, content_en: e.target.value })} /></div>
            </div>
          </details>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="post-image">Imagen principal *</Label>
              <Input
                id="post-image"
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "image")}
              />
              {draft.image && <img src={previews[draft.image] || draft.image} alt="Vista previa de la imagen principal" className="h-36 w-full rounded-lg object-cover" />}
            </div>
            <div className="space-y-2">
              <Label htmlFor="post-images">Imágenes adicionales</Label>
              <Input
                id="post-images"
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "images")}
              />
              {(draft.images ?? []).map((img) => (
                <div key={img} className="flex items-center gap-2">
                  <img src={previews[img] || img} alt="Imagen adicional" className="h-16 w-20 rounded object-cover" />
                  <Button type="button" size="sm" variant="outline" onClick={() => setDraft({ ...draft, images: (draft.images ?? []).filter((path) => path !== img) })}>Quitar</Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <Switch
                checked={draft.published ?? true}
                onCheckedChange={(v) => setDraft({ ...draft, published: v })}
              />
              <Label>Publicar ahora</Label>
            </div>
          </div>

          <details className="rounded-lg border border-border p-4">
            <summary className="cursor-pointer text-sm text-muted-foreground">Dirección y orden (avanzado)</summary>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div><Label htmlFor="post-slug">Dirección del artículo</Label><Input id="post-slug" className="mt-2" value={draft.slug ?? ""} disabled={Boolean(draft.id)} placeholder={slugify(draft.title_es || "titulo-del-articulo")} onChange={(e) => setDraft({ ...draft, slug: slugify(e.target.value) })} /><p className="mt-1 text-xs text-muted-foreground">Una vez creado, no cambia para conservar los enlaces.</p></div>
              <div><Label htmlFor="post-order">Orden de aparición</Label><Input id="post-order" className="mt-2" type="number" value={draft.sort_order ?? 0} onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })} /></div>
            </div>
          </details>

          <div className="flex gap-3">
            <Button onClick={save} disabled={saving} className="font-light">
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {draft.published ? "Guardar y publicar" : "Guardar borrador"}
            </Button>
            <Button variant="outline" onClick={cancel} className="font-light">
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Experiencias y artículos</h2>
        <p className="mt-1 text-sm text-muted-foreground">Crea artículos con fotos para contar planes de la zona. Empieza como borrador y publícalo cuando esté completo.</p>
      </div>
      <Button onClick={() => edit(emptyPost())} className="font-light">
        <Plus className="mr-2 h-4 w-4" /> Nueva entrada
      </Button>

      {posts.length === 0 && (
        <p className="text-muted-foreground font-light">
          Aún no hay entradas creadas desde el panel.
        </p>
      )}

      <p className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">Los artículos originales de la web siguen visibles, pero todavía se gestionan en el código. Las nuevas entradas creadas aquí sí se pueden editar y publicar desde este panel.</p>

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
              {post.published && <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${post.title_es} en la web`} className="text-primary"><ExternalLink className="h-4 w-4" /></a>}
              <Button variant="outline" size="sm" onClick={() => edit(post)} className="font-light">
                Editar
              </Button>
              <Button variant="ghost" size="icon" aria-label={`Eliminar ${post.title_es}`} onClick={() => void remove(post.id)}>
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
