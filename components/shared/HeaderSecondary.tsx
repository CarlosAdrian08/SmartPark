import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HeaderSecondary = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        // onPress={() => console.log("Volver")}
        onPress={() => router.back()}
        style={{ padding: 4 }}
      >
        <Ionicons name="arrow-back" size={24} color={Colors.textSecondary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
    backgroundColor: Colors.surface,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default HeaderSecondary;
