import HeaderSecondary from "@/components/shared/HeaderSecondary";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Alert } from "react-native"; // Para mostrar errores de forma sencilla
import { useAuth } from "@/hooks/useAuth"; // Importamos el hook de autenticación

/* Pantalla */
export default function ProfileScreen() {
  const [loading, setLoading] = useState(false); // Estado local para el feedback del botón
  const router = useRouter();
  const { session, user, signOut, exitGuest } = useAuth();

  // Datos reales si hay sesión, fallback si es invitado
  const displayName = user?.user_metadata?.nombre ?? "Invitado";
  const displayEmail = user?.email ?? "Sin cuenta";

  const handleLogout = async () => {
    setLoading(true);

    try {
      await signOut();
      exitGuest(); // resetea el modo invitado
    } catch (error: any) {
      Alert.alert("No se pudo cerrar la sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderSecondary title="Perfil de Usuario" />

        <Avatar name={displayName} />

        <Text style={styles.name}>{displayName}</Text>
        <Text style={styles.email}>{displayEmail}</Text>

        <Section title="CONFIGURACIÓN">
          <Item icon="mail-outline" label="Correo Electrónico" />
          <Item icon="lock-closed-outline" label="Contraseña" />
          <Item icon="globe-outline" label="Idioma" value="Español" />
        </Section>

        <Section title="AYUDA">
          <Item icon="help-circle-outline" label="Soporte" />
          <Item icon="document-text-outline" label="Términos y Condiciones" />
        </Section>
        <Section>
          {session ? (
            <Button
              title="Cerrar Sesión"
              variant="danger"
              iconName="logout"
              iconColor="red"
              onPress={handleLogout}
              loading={loading}
              disabled={loading}
            />
          ) : (
            <Button
              title="Iniciar Sesión"
              variant="secondary"
              onPress={handleLogin}
            />
          )}
        </Section>
      </ScrollView>
    </View>
  );
}

/* -------- COMPONENTES (luego van en /components) -------- */

const Section = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.card}>{children}</View>
  </View>
);

const Item = ({ icon, label, value }: any) => (
  <TouchableOpacity style={styles.item}>
    <View style={styles.itemLeft}>
      <Ionicons name={icon} size={20} color={Colors.textMuted} />
      <Text style={styles.itemText}>{label}</Text>
    </View>

    <View style={styles.itemRight}>
      {value && <Text style={styles.value}>{value}</Text>}
      <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
    </View>
  </TouchableOpacity>
);

/* -------- ESTILOS -------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  name: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },

  email: {
    textAlign: "center",
    color: Colors.textMuted,
    fontWeight: "600",
    marginBottom: 20,
  },

  section: {
    paddingHorizontal: 16,
    marginTop: 16,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "400",
    color: Colors.textMuted,
    marginBottom: 8,
    letterSpacing: 1,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  itemLeft: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  itemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  itemText: {
    fontSize: 14,
  },

  value: {
    color: Colors.textMuted,
  },
});
