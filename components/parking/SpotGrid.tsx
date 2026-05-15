import { Spot } from "@/types/spot.types";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SpotCard } from "./SpotCard";

export function SpotGrid({
  porZona,
  onPressSpot,
}: {
  porZona: Record<string, Spot[]>;
  onPressSpot?: (spot: Spot) => void;
}) {
  const zonas = Object.keys(porZona);

  return (
    <ScrollView>
      {zonas.map((zona) => (
        <View key={zona} style={{ paddingHorizontal: 12, marginBottom: 8 }}>
          <Text style={{ fontSize: 12, fontWeight: "100", marginVertical: 8 }}>
            Zona: {zona}
          </Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {porZona[zona].map((spot) => (
              <View key={spot.id} style={{ width: "50%" }}>
                <SpotCard spot={spot} onPress={() => onPressSpot?.(spot)} />
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
