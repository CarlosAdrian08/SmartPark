import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

// 1. Importaciones Locales (usando alias @/ como en tu HeaderSecondary)
import { Colors } from "@/constants/Colors";
import HeaderSecondary from "@/components/shared/HeaderSecondary";

// --- DATOS MOCK (Simulados para la vista) ---
const summaryData = {
  totalVisits: 12,
  totalTime: "24h 45m",
};

const visitsHistory = [
  {
    id: "1",
    date: "12 Oct 2023",
    location: "Sección A, Nivel 1",
    entryTime: "10:30",
    exitTime: "12:45",
    duration: "2h 15m",
    status: "COMPLETADO",
  },
  {
    id: "2",
    date: "08 Oct 2023",
    location: "Sección A, Nivel 3",
    entryTime: "08:15",
    exitTime: "17:30",
    duration: "9h 15m",
    status: "COMPLETADO",
  },
  // Añade más datos aquí para probar el scroll
];

// --- COMPONENTES INTERNOS HELPER ---

// Componente para las tarjetas superiores de resumen
const StatCard = ({ title, value }: { title: string; value: string | number }) => (
  <View style={styles.statCard}>
    <Text style={styles.statCardTitle}>{title}</Text>
    <Text style={styles.statCardValue}>{value}</Text>
  </View>
);

// Componente para cada registro de visita en la lista
const VisitRecordCard = ({ item }: { item: (typeof visitsHistory)[0] }) => (
  <View style={styles.recordCard}>
    {/* Fila 1: Fecha y Estado */}
    <View style={styles.recordHeader}>
      <Text style={styles.recordDate}>{item.date}</Text>
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>

    {/* Fila 2: Ubicación con Icono */}
    <View style={styles.locationContainer}>
      <Ionicons
        name="location-outline"
        size={14}
        color={Colors.textMuted}
        style={{ marginRight: 4 }}
      />
      <Text style={styles.locationText}>{item.location}</Text>
    </View>

    {/* Fila 3: Títulos de tiempos (Entrada, Salida, Duración) */}
    <View style={styles.detailsTimeGrid}>
      <View style={styles.timeColumn}>
        <Text style={styles.detailsTitle}>ENTRADA</Text>
        <Text style={styles.timeValue}>{item.entryTime}</Text>
      </View>
      <View style={styles.timeColumn}>
        <Text style={styles.detailsTitle}>SALIDA</Text>
        <Text style={styles.timeValue}>{item.exitTime}</Text>
      </View>
      <View style={[styles.timeColumn, styles.timeColumnEnd]}>
        <Text style={styles.detailsTitle}>DURACIÓN</Text>
        <Text style={[styles.timeValue, styles.durationValue]}>
          {item.duration}
        </Text>
      </View>
    </View>
  </View>
);

// --- COMPONENTE PRINCIPAL DE LA PANTALLA ---

const HistoryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* 2. Reutilización del Header */}
      <HeaderSecondary title="Historial de Visitas" />

      {/* Contenido Scrolleable */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* SECCIÓN 1: Resumen (Stats) */}
        <View style={styles.statsContainer}>
          <StatCard title="TOTAL VISITAS" value={summaryData.totalVisits} />
          <StatCard title="TIEMPO TOTAL" value={summaryData.totalTime} />
        </View>

        {/* SECCIÓN 2: Título de Recientes */}
        <Text style={styles.sectionTitle}>RECIENTES</Text>

        {/* SECCIÓN 3: Lista de Registros */}
        <View style={styles.listContainer}>
          {visitsHistory.map((visit) => (
            <VisitRecordCard key={visit.id} item={visit} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- ESTILOS ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Usando tu color de fondo
    // paddingTop necesario para Android si no usas Expo Router's automatic safe area
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24, // Espacio al final para el tab bar
  },

  // Sección Stats (Top Cards)
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    // Usando un color similar al de la imagen, que es un cian muy claro.
    // Podrías añadir esto a tus Colors.ts como 'surfaceSubtle'.
    backgroundColor: "#F0F9F9",
    padding: 16,
    borderRadius: 12,
    minHeight: 80,
    justifyContent: "center",
  },
  statCardTitle: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.textSecondary, // Color cian de tu paleta
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statCardValue: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textSecondary, // Color cian de tu paleta
  },

  // Título de Sección
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textMuted, // Gris claro
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },

  // Lista de Registros (Cartas grandes)
  listContainer: {
    gap: 16, // Espaciado entre cartas
  },
  recordCard: {
    backgroundColor: Colors.surface, // Blanco
    borderRadius: 16,
    padding: 16,
    // Box Shadow similar al del Header
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  recordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  recordDate: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary, // Casi negro
  },
  statusBadge: {
    backgroundColor: "#E6F6F6", // Fondo cian muy claro para el badge
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 9,
    fontWeight: "700",
    color: Colors.textSecondary, // Texto cian
    textTransform: "uppercase",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20, // Espacio antes de los detalles de tiempo
  },
  locationText: {
    fontSize: 13,
    color: Colors.textMuted, // Gris
    fontWeight: "400",
  },

  // Grid de detalles de tiempo
  detailsTimeGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeColumn: {
    flex: 1,
  },
  timeColumnEnd: {
    alignItems: "flex-end", // Alinea la duración a la derecha
  },
  detailsTitle: {
    fontSize: 10,
    fontWeight: "500",
    color: "#94A3B8", // Gris azulado pálido para títulos pequeños
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  durationValue: {
    color: Colors.textSecondary, // Duración en cian
    fontWeight: "700",
  },
});

export default HistoryScreen;