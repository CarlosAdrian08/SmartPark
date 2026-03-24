// Componente InfoCard: Tarjeta de información para detalles del cajón
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export default function InfoCard({ icon, title, value }: InfoCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 6,
    // Sombras nativas
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 10,
    fontWeight: "bold",
    color: Colors.textMuted,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
});