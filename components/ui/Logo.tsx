import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Logo() {
  return (
    <View style={styles.headerRow}>
      <Ionicons name="car" size={30} color={Colors.primary} />
      <Text style={styles.brandText}>SmartPark</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  brandText: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.primary,
  },
});
