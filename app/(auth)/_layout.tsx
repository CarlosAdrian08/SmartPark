import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const { session, loading } = useAuth();
  const { guestMode } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";
    if (session && inAuthGroup) {
      router.replace("/(tabs)");
    } else if (!session && !inAuthGroup && !guestMode) {
      router.replace("/(auth)/login");
    }
  }, [session, loading, segments, guestMode]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Rutas concretas que necesitan config explícita */}
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="spot/[id]" />
      {/* NO se declaran (auth) ni (zShared) aquí */}
    </Stack>
  );
}
