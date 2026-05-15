import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "@/constants/Colors";

import Callout from "@/components/ui/Callout";
import Logo from "@/components/ui/Logo";

import { SpotGrid } from "@/components/parking/SpotGrid";
import { useSpots } from "@/hooks/useSpots";

export default function Index() {
  const router = useRouter();
  const { spots, porZona, loading, error } = useSpots();

  const occupiedCount = spots.filter(
    (spot) => spot.estado === "Ocupado",
  ).length;
  const totalCount = spots.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Logo y Título */}
        <Logo />

        {/* Tarjeta de Resumen */}
        <View style={styles.statusCard}>
          <View>
            <Text style={styles.statusLabel}>ESTADO ACTUAL DE LOS CAJONES</Text>
            <Text style={styles.statusMain}>
              {loading
                ? "Cargando..."
                : `${occupiedCount}/${totalCount} Ocupados`}
            </Text>
            <View style={styles.updateRow}>
              <MaterialIcons name="access-time" size={14} color="#fff" />
              <Text style={styles.updateText}>Actualizado hace 2 minutos</Text>
            </View>
          </View>
          <MaterialIcons
            name="directions-car"
            size={100}
            color="rgba(255,255,255,0.15)"
            style={styles.bgIcon}
          />
        </View>

        {/* Leyenda */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mapa de Estacionamiento</Text>
          <View style={styles.legend}>
            <View style={[styles.dot, { backgroundColor: "#10B981" }]} />
            <Text style={styles.legendText}>Libre</Text>
            <View style={[styles.dot, { backgroundColor: Colors.danger }]} />
            <Text style={styles.legendText}>Ocupado</Text>
          </View>
        </View>

        {loading && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator />
            <Text style={{ marginTop: 8 }}>Cargando cajones...</Text>
          </View>
        )}

        {error && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
            }}
          >
            <Text style={{ color: "#DC2626", fontWeight: "700" }}>
              Error cargando tablero
            </Text>
            <Text style={{ marginTop: 8, color: "#6B7280" }}>
              {String(error)}
            </Text>
          </View>
        )}

        <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
          <SpotGrid
            porZona={porZona}
            onPressSpot={(spot) =>
              router.push(
                `/spot/${spot.codigo}?occupied=${spot.estado === "Ocupado"}`,
              )
            }
          />
        </View>

        {/* Cuadro informativo inferior */}
        <Callout
          title="¿Buscas un sitio específico?"
          subtitle="Toca un número para ver detalles."
          iconName="help-circle-outline"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  statusCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 32,
  },
  statusLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  statusMain: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "800",
    marginVertical: 4,
  },
  updateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  updateText: {
    color: "#fff",
    fontSize: 12,
  },
  bgIcon: {
    position: "absolute",
    right: -15,
    bottom: -15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
    flex: 1,
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginRight: 4,
  },
});
