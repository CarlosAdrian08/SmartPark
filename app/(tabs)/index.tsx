import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors } from "../../constants/Colors"; // Ajustado según tu captura de archivos

export default function Index() {
  const router = useRouter();
  // Simulación de los 10 espacios de la imagen
  const parkingSpots = [
    { id: 1, occupied: false }, { id: 6, occupied: true },
    { id: 2, occupied: true },  { id: 7, occupied: false },
    { id: 3, occupied: false }, { id: 8, occupied: false },
    { id: 4, occupied: false }, { id: 9, occupied: true },
    { id: 5, occupied: true },  { id: 10, occupied: false },
  ];

  const handleSpotPress = (id: number) => {
    // Viaja a la ruta dinámica, pasando el ID en la URL
    router.push(`/spot/${id}`);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Logo y Título */}
        <View style={styles.headerRow}>
          <Ionicons name="car" size={30} color={Colors.primary} />
          <Text style={styles.brandText}>SmartPark</Text>
        </View>

        {/* Tarjeta de Resumen */}
        <View style={styles.statusCard}>
          <View>
            <Text style={styles.statusLabel}>ESTADO ACTUAL</Text>
            <Text style={styles.statusMain}>6/10 spots</Text>
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

        {/* Grid de Espacios (2 columnas) */}
        <View style={styles.grid}>
          {parkingSpots.map((spot) => (
            <TouchableOpacity 
              key={spot.id} 
              activeOpacity={0.7}
              onPress={() => handleSpotPress(spot.id)}
              style={[
                styles.spotCard, 
                { borderColor: spot.occupied ? Colors.danger : "#10B981" }
              ]}
            >
              <Text style={[
                styles.spotNumber, 
                { color: spot.occupied ? "#94A3B8" : Colors.textPrimary }
              ]}>
                {spot.id}
              </Text>
              <MaterialIcons 
                name={spot.occupied ? "cancel" : "check-circle"} 
                size={24} 
                color={spot.occupied ? Colors.danger : "#10B981"} 
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Cuadro informativo inferior */}
        <View style={styles.infoBox}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="information-outline" size={24} color={Colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>¿Buscas un sitio específico?</Text>
            <Text style={styles.infoSubtitle}>Toca un número para ver detalles.</Text>
          </View>
        </View>

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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  brandText: {
    fontSize: 26,
    fontWeight: "800",
    color: Colors.primary,
  },
  statusCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden", // Para el icono de fondo
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  spotCard: {
    width: "48%", // Casi la mitad para dejar espacio al gap
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1.5,
    marginBottom: 12,
  },
  spotNumber: {
    fontSize: 24,
    fontWeight: "800",
  },
  infoBox: {
    backgroundColor: "#EBF8FF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 20,
  },
  infoIconContainer: {
    backgroundColor: "#D1E9F6",
    padding: 10,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  infoSubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
  },
});