import { useState, useEffect } from "react";
import { authService } from "@/services/auth.service";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import { useAuthStore } from "@/store/auth.store";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { setGuestMode } = useAuthStore();

  useEffect(() => {
    // Verificar sesión inicial
    authService.getSession().then((session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Escuchar cambios en el estado de autenticación (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    session,
    loading,
    signIn: authService.signIn,
    signUp: authService.signUp,
    signOut: authService.signOut,
    enterAsGuest: () => setGuestMode(true),
    exitGuest: () => setGuestMode(false),
  };
}
