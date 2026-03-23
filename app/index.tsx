// Pantalla de prueba mientras lo programa Cristian (Login y registro) y Ruben (Inicio)
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F7FA", // Fondo clarito de la app
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 30, color: "#111827" }}>
        SmartPark - Pruebas
      </Text>

      {/* ATAJOS TEMPORALES */}
      <View style={{ padding: 20, backgroundColor: '#FFFFFF', borderRadius: 15, shadowOpacity: 0.1, elevation: 2 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 20, fontSize: 16, color: "#6B7280" }}>
          Atajos a tus pantallas:
        </Text>
        
        <Link href="/forgot-password" style={{ color: '#0F6E56', fontSize: 18, marginBottom: 20, fontWeight: 'bold' }}>
          👉 Ir a Recuperar Contraseña
        </Link>
        
        <Link href="/spot/1" style={{ color: '#0F6E56', fontSize: 18, fontWeight: 'bold' }}>
          👉 Ir a Detalles del Sitio [1]
        </Link>
      </View>
    </View>
  );
}