// utils/supabase.ts
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

// Storage condicional: AsyncStorage en móvil, localStorage en web
function getStorage() {
  if (Platform.OS === "web") {
    // En web usamos localStorage nativo del browser (no AsyncStorage)
    return {
      getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
      setItem: (key: string, value: string) => {
        localStorage.setItem(key, value);
        return Promise.resolve();
      },
      removeItem: (key: string) => {
        localStorage.removeItem(key);
        return Promise.resolve();
      },
    };
  }

  // En iOS/Android usamos AsyncStorage normalmente
  const AsyncStorage =
    require("@react-native-async-storage/async-storage").default;
  return AsyncStorage;
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: getStorage(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === "web", // true solo en web
  },
});
