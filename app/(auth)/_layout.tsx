import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const { session, loading, signOut, profileExists } = useAuth();
  const { guestMode } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (loading || !session) return;

    async function validateUser() {
      const exists = await profileExists(session?.user.id || "");
      if (!exists) {
        await signOut();
        router.replace("/(auth)/login");
        return;
      }
      setChecked(true);
    }

    validateUser();
  }, [session, loading]);

  useEffect(() => {
    if (loading || !checked) return;

    const inAuthGroup = segments[0] === "(auth)";
    if (session && inAuthGroup) {
      router.replace("/(tabs)");
    } else if (!session && !inAuthGroup && !guestMode) {
      router.replace("/(auth)/login");
    }
  }, [session, loading, checked, segments, guestMode]);

  return <Stack screenOptions={{ headerShown: false }} />;
}