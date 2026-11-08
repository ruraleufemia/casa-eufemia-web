import { supabase } from "@/integrations/supabase/client";

export const MEDIA_BUCKET = "site-media";

/** Values that already are absolute URLs or public/ paths are used as-is. */
export const isStoragePath = (value: string) =>
  !!value && !value.startsWith("http") && !value.startsWith("/") && !value.startsWith("data:");

const SIGN_TTL = 60 * 60 * 24 * 7; // 7 days

const cache = new Map<string, string>();

/** Resolves a mix of public paths and storage paths into displayable URLs. */
export async function resolveMediaUrls(values: string[]): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  const pending: string[] = [];

  for (const value of values) {
    if (!value) continue;
    if (!isStoragePath(value)) {
      result[value] = value;
    } else if (cache.has(value)) {
      result[value] = cache.get(value)!;
    } else if (!pending.includes(value)) {
      pending.push(value);
    }
  }

  if (pending.length > 0) {
    const { data } = await supabase.storage.from(MEDIA_BUCKET).createSignedUrls(pending, SIGN_TTL);
    data?.forEach((item) => {
      if (item.signedUrl && item.path) {
        cache.set(item.path, item.signedUrl);
        result[item.path] = item.signedUrl;
      }
    });
  }

  return result;
}

export async function resolveMediaUrl(value: string): Promise<string> {
  const map = await resolveMediaUrls([value]);
  return map[value] ?? value;
}

export async function uploadMedia(file: File, folder = "uploads"): Promise<string> {
  const extensions: Record<string, string> = {
    "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif",
  };
  const ext = extensions[file.type];
  if (!ext || file.size > 8 * 1024 * 1024) {
    throw new Error("Usa una foto JPG, PNG, WebP o AVIF de hasta 8 MB");
  }
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return path;
}
