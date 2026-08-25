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
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return path;
}
