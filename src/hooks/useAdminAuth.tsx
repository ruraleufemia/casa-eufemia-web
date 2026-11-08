import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AdminAuthState = {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
};

export const useAdminAuth = (): AdminAuthState => {
  const [state, setState] = useState<AdminAuthState>({
    session: null, user: null, isAdmin: false, loading: true,
  });

  useEffect(() => {
    let active = true;
    let request = 0;
    const timers = new Set<ReturnType<typeof setTimeout>>();

    const check = async (session: Session | null) => {
      const current = ++request;
      if (!session) {
        if (active) setState({ session: null, user: null, isAdmin: false, loading: false });
        return;
      }

      // Keep the protected screen closed until the database role is known.
      if (active) setState({ session, user: session.user, isAdmin: false, loading: true });
      const { data, error } = await supabase.from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (active && current === request) {
        setState({ session, user: session.user, isAdmin: !error && !!data, loading: false });
      }
    };

    // Supabase emits INITIAL_SESSION. Defer the role query outside its auth callback.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        if (active) void check(session);
      }, 0);
      timers.add(timer);
    });

    return () => {
      active = false;
      request++;
      timers.forEach(clearTimeout);
      subscription.unsubscribe();
    };
  }, []);

  return state;
};
