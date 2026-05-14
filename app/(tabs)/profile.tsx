import HeaderSecondary from "@/components/shared/HeaderSecondary";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/* Pantalla */
export default function ProfileScreen() {
  const router = useRouter();
  // aquí iría useAuth()
  const user = {
    name: "Juan Pérez",
    email: "juan.perez@email.com",
  };

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderSecondary title="Perfil de Usuario" />

        <Avatar name={user.name} />

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>

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
          <Button
            title="Cerrar Sesión"
            variant="danger"
            iconName="logout"
            iconColor="red"
            onPress={handleLogout}
          />
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
