import { Redirect } from "expo-router";
import React from "react";

export default function StartScreen() {
  // Redirige automáticamente a la ruta de Login al abrir la app
  return <Redirect href="/(auth)/login" />;
}
