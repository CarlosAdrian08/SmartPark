// Componente Badge: Indicador de estado para cajones
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface BadgeProps {
  status: "available" | "occupied";
}

export default function Badge({ status }: BadgeProps) {
  const isAvailable = status === "available";
  // Verificamos el estado para determinar el color y el texto del badge
  const backgroundColor = isAvailable ? Colors.available : Colors.danger;
  const label = isAvailable ? "Estado: Libre" : "Estado: Ocupado";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.dot} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.surface,
    opacity: 0.8,
    marginRight: 6,
  },
  text: {
    color: Colors.surface,
    fontSize: 12,
    fontWeight: "bold",
  },
});