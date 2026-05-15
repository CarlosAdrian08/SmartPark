import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { supabase } from "@/utils/supabase";
import { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

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
    updateProfile: authService.updateProfile,
    profileExists: authService.profileExists,
    updateEmail: authService.updateEmail,
    updatePassword: authService.updatePassword,
    deleteAccount: authService.deleteAccount,
    refreshSession: async () => {
      const session = await authService.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      return session;
    },
    enterAsGuest: () => setGuestMode(true),
    exitGuest: () => setGuestMode(false),
  };
}
