import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth } from "@/hooks/useAuth";
import { Alert } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp } = useAuth(); // ← hook

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // ← nuevo

  const handleRegister = async () => {
    // Validaciones
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Campos incompletos", "Por favor llena todos los campos.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, fullName);
      Alert.alert(
        "¡Registro exitoso!",
        "Revisa tu correo para confirmar tu cuenta.",
        [{ text: "OK", onPress: () => router.replace("/(auth)/login") }],
      );
    } catch (error: any) {
      Alert.alert("Error al registrarse", error.message || "Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    router.push("/(auth)/login");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>SmartPark</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>P</Text>
              </View>
            </View>

            {/* Header */}
            <View style={styles.headerSection}>
              <Text style={styles.title}>Comienza ahora</Text>
              <Text style={styles.subtitle}>
                Regístrate para gestionar tus estacionamientos con inteligencia.
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <Input
                label="NOMBRE COMPLETO"
                placeholder="Ej. Juan Pérez"
                value={fullName}
                onChangeText={setFullName}
                iconName="person-outline"
                editable={!loading}
              />

              <Input
                label="CORREO ELECTRÓNICO"
                placeholder="correo@ejemplo.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                iconName="mail-outline"
                editable={!loading}
              />

              <Input
                label="CONTRASEÑA"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                isPassword
                iconName="lock-closed-outline"
                editable={!loading}
              />

              <Input
                label="CONFIRMAR CONTRASEÑA"
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                isPassword
                iconName="checkmark-circle-outline"
                editable={!loading}
              />

              <Button
                title="Crear cuenta"
                onPress={handleRegister}
                variant="secondary"
                fullWidth
                iconName="arrow-forward"
                iconPosition="right"
                iconColor="#fff"
                style={styles.registerButton}
                loading={loading}
                disabled={loading}
              />

              {/* Terms */}
              <Text style={styles.termsText}>
                Al registrarte, aceptas nuestros{" "}
                <Text style={styles.termsLink}>Términos de Servicio</Text> y{" "}
                <Text style={styles.termsLink}>Política de Privacidad</Text>
              </Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
              <TouchableOpacity onPress={handleGoToLogin}>
                <Text style={styles.loginLink}>Inicia Sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    paddingHorizontal: SCREEN_WIDTH > 600 ? 48 : 24,
    paddingVertical: SCREEN_HEIGHT > 700 ? 32 : 16,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: SCREEN_HEIGHT > 700 ? 24 : 16,
  },
  logo: {
    width: SCREEN_WIDTH > 600 ? 80 : 60,
    height: SCREEN_WIDTH > 600 ? 80 : 60,
    borderRadius: SCREEN_WIDTH > 600 ? 40 : 30,
    backgroundColor: Colors.textSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: SCREEN_WIDTH > 600 ? 40 : 30,
    fontWeight: "700",
    color: Colors.surface,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: SCREEN_HEIGHT > 700 ? 24 : 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: SCREEN_WIDTH > 600 ? 26 : 22,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: SCREEN_WIDTH > 600 ? 15 : 13,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 18,
  },
  form: {
    marginBottom: 20,
  },
  registerButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  termsText: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 16,
  },
  termsLink: {
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 8,
  },
  footerText: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  loginLink: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
});
