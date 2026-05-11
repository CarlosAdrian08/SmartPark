import InfoCard from "@/components/parking/InfoCard";
import HeaderSecondary from "@/components/shared/HeaderSecondary";
import Badge from "@/components/ui/Badge";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface SpotInfo {
  id: string;
  name: string;
  status: "available" | "occupied";
  location: string;
  rate: string;
}

export default function SpotDetailScreen() {
  // 1. Recepción de parámetros: Capturamos el ID del cajón que viene en la ruta
  const { id, occupied } = useLocalSearchParams<{
    id: string;
    occupied: string;
  }>();
  const router = useRouter();

  // 2. Uso de Hooks (useState): Para manejar los datos y el estado de carga
  const [spot, setSpot] = useState<SpotInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // 3. Uso de Hooks (useEffect): Simulamos pedir los datos al servidor cuando la pantalla abre
  useEffect(() => {
    const fetchSpotData = () => {
      setTimeout(() => {
        setSpot({
          id: id || "1",
          name: `Sitio ${id || "1"}`,
          status: occupied === "true" ? "occupied" : "available",
          location: "Sección A, Nivel 1",
          rate: "$25.00/hora",
        });
        setLoading(false);
      }, 500);
    };

    fetchSpotData();
  }, [id, occupied]);

  // Pantalla de carga mientras se obtienen los datos
  if (loading || !spot) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>
          Cargando información del sitio...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Usamos el componente estandarizado del equipo */}
        <HeaderSecondary title="Detalles del Sitio" />

        <View style={styles.contentPadding}>
          <Badge status={spot.status} />

          {/* Tarjeta principal (Color Primary) */}
          <View style={styles.mainCard}>
            {/* La letra P de fondo */}
            <Text style={styles.watermark}>P</Text>
            <Text style={styles.mainCardTitle}>{spot.name}</Text>
            <Text style={styles.mainCardSubtitle}>
              Disponible ahora para su reserva
            </Text>
          </View>

          {/* Fila de tarjetas (Ubicación y Tarifa) */}
          <View style={styles.cardsRow}>
            <InfoCard
              icon={
                <Ionicons
                  name="location-outline"
                  size={20}
                  color={Colors.primary}
                />
              }
              title="UBICACIÓN"
              value={spot.location}
            />
            <InfoCard
              icon={
                <Ionicons
                  name="cash-outline"
                  size={20}
                  color={Colors.primary}
                />
              }
              title="TARIFA"
              value={spot.rate}
            />
          </View>

          {/* Contenedor simulado del Mapa */}
          <View style={styles.mapContainer}>
            <Ionicons name="map-outline" size={48} color={Colors.textMuted} />
            <Text style={styles.mapText}>Área del mapa (Próximamente)</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: 12,
    color: Colors.textMuted,
    fontWeight: "bold",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  contentPadding: {
    paddingHorizontal: 24,
    paddingTop: 16, // Espacio entre el HeaderSecondary y el contenido
  },
  mainCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    overflow: "hidden",
    position: "relative",
  },
  watermark: {
    position: "absolute",
    right: -10,
    bottom: -30,
    fontSize: 140,
    fontWeight: "900",
    color: Colors.surface,
    opacity: 0.1,
  },
  mainCardTitle: {
    fontSize: 40,
    fontWeight: "900",
    color: Colors.surface,
    marginBottom: 8,
  },
  mainCardSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: -6,
    marginBottom: 24,
  },
  mapContainer: {
    height: 200,
    backgroundColor: "#E2E8F0",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    position: "relative",
  },
  mapText: {
    marginTop: 8,
    color: Colors.textMuted,
    fontWeight: "500",
  },
});
