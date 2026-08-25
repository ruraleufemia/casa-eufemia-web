import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  try {
    const { count, error: countError } = await admin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");

    if (countError) throw countError;
    const hasAdmin = (count ?? 0) > 0;

    if (req.method === "GET") {
      return json({ hasAdmin });
    }

    if (req.method !== "POST") {
      return json({ error: "Method not allowed" }, 405);
    }

    if (hasAdmin) {
      return json({ error: "Ya existe un administrador" }, 403);
    }

    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) return json({ error: "No autenticado" }, 401);

    const { data: userData, error: userError } = await admin.auth.getUser(token);
    if (userError || !userData?.user) return json({ error: "No autenticado" }, 401);

    const { error: insertError } = await admin
      .from("user_roles")
      .insert({ user_id: userData.user.id, role: "admin" });

    if (insertError) throw insertError;

    return json({ success: true });
  } catch (e) {
    console.error("admin-bootstrap error", e);
    return json({ error: "Error interno" }, 500);
  }
});
