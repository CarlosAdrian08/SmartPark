// store/auth.store.ts
import { create } from "zustand";
import { Session } from "@supabase/supabase-js";

interface AuthStore {
  session: Session | null;
  guestMode: boolean;
  setSession: (session: Session | null) => void;
  setGuestMode: (value: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  guestMode: false,
  setSession: (session) => set({ session }),
  setGuestMode: (value) => set({ guestMode: value }),
}));
