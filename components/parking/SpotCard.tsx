import { Colors } from "@/constants/Colors";
import { Spot } from "@/types/spot.types";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

export function SpotCard({
  spot,
  onPress,
}: {
  spot: Spot;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: "90%",
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: 18,
        flexDirection: "row",
        gap: 4,
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1.5,
        marginBottom: 12,
        borderColor: spot.estado === "Ocupado" ? Colors.danger : "#10B981",
      }}
    >
      <View style={{ gap: 4 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "800",
            color: spot.estado === "Ocupado" ? "#94A3B8" : Colors.textPrimary,
          }}
        >
          {spot.codigo ?? "Cajón"}
        </Text>
        {/* <Text style={{ color: "#6B7280" }}>Zona: {spot.zona ?? "—"}</Text> */}
      </View>

      <MaterialIcons
        name={spot.estado === "Ocupado" ? "cancel" : "check-circle"}
        size={16}
        color={spot.estado === "Ocupado" ? Colors.danger : "#10B981"}
      />
    </Pressable>
  );
}
