// app/_layout.tsx (Santiago)
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(zShared)" options={{ headerShown: false }} />
    </Stack>
  );
}