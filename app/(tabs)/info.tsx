// screens/InformationScreen.tsx
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import HeaderSecondary from "@/components/shared/HeaderSecondary";
import Button from "@/components/ui/Button";

// Definición de colores locales para la pantalla, o extender Colors
const screenColors = {
  ...Colors,
  cardBackground: "#F9FAFB",
  tagBackground: "#F1F5F9",
  tagText: "#475569",
  mapActionButton: "#0D9488", // Coincide con Colors.textSecondary en la imagen
  primaryLight: "#EBF8F7", // Azul claro para el botón de email
};

// Subcomponente reutilizable para las tarjetas de información
const InfoCard = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => {
  return (
    <View style={styles.infoCard}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon as any} size={24} color={screenColors.textSecondary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

// Subcomponente reutilizable para las etiquetas de servicios
const ServiceTag = ({ text }: { text: string }) => {
  return (
    <View style={styles.serviceTag}>
      <Text style={styles.serviceTagText}>{text}</Text>
    </View>
  );
};

const InformationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderSecondary title="Información del Estacionamiento" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Sección de Mapa */}
        <View style={styles.mapContainer}>
          <Image
            source={{
              uri: "https://maps.googleapis.com/maps/api/staticmap?center=Mexico+City&zoom=14&size=600x400&markers=color:red%7CLabel:P%7CMexico+City&key=YOUR_API_KEY", // Reemplazar con URL de imagen estática real o componente de mapa
            }}
            style={styles.mapImage}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.mapActionButton} activeOpacity={0.7}>
            <Ionicons name="git-pull-request" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Título del estacionamiento */}
        <Text style={styles.parkTitle}>SmartPark Centro</Text>

        {/* Tarjetas de información */}
        <InfoCard
          icon="location-outline"
          label="DIRECCIÓN"
          value="Av. Libertad 123, Ciudad de México"
        />
        <InfoCard
          icon="cash-outline"
          label="TARIFA"
          value="$25.00 por hora"
        />
        <InfoCard
          icon="time-outline"
          label="HORARIO DE OPERACIÓN"
          value="Lunes a Domingo: 07:00 - 22:00"
        />

        {/* Sección de Contacto */}
        <Text style={styles.sectionTitle}>CONTACTO</Text>
        <View style={styles.contactButtons}>
          <Button
            title="Llamar"
            variant="primary"
            iconName="phone"
            iconPosition="left"
            style={{ flex: 1 }}
          />
          <Button
            title="Email"
            variant="ghost"
            iconName="email"
            iconPosition="left"
            style={{
              flex: 1,
              backgroundColor: screenColors.primaryLight,
            }}
            textStyle={{ color: screenColors.primary }}
          />
        </View>

        {/* Sección de Servicios */}
        <Text style={styles.sectionTitle}>SERVICIOS</Text>
        <View style={styles.servicesGrid}>
          <ServiceTag text="Seguridad 24/7" />
          <ServiceTag text="Cámaras" />
          <ServiceTag text="Techado" />
          <ServiceTag text="Acceso Silla Ruedas" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: screenColors.surface,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  mapContainer: {
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  mapImage: {
    width: "100%",
    height: 180,
  },
  mapActionButton: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: screenColors.mapActionButton,
    padding: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  parkTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: screenColors.textPrimary,
    marginBottom: 20,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: screenColors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: screenColors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: screenColors.textMuted,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  value: {
    fontSize: 16,
    fontWeight: "700",
    color: screenColors.textPrimary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: screenColors.textPrimary,
    marginTop: 24,
    marginBottom: 16,
    textTransform: "uppercase",
  },
  contactButtons: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  serviceTag: {
    backgroundColor: screenColors.tagBackground,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  serviceTagText: {
    fontSize: 14,
    color: screenColors.tagText,
    fontWeight: "600",
  },
});

export default InformationScreen;