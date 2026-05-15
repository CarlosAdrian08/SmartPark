import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Colors } from "@/constants/Colors";
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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Iniciar sesión", { email, password });
  };

  const handleContinueWithoutAccount = () => {
    // console.log("Continuar sin cuenta");
    router.replace("/(tabs)");
  };

  const handleForgotPassword = () => {
    router.push("/(auth)/forgot-password");
  };

  const handleRegister = () => {
    router.push("/(auth)/register");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* App Name */}
            <Text style={styles.appName}>SmartPark</Text>

            {/* Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>P</Text>
              </View>
            </View>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Bienvenido a SmartPark</Text>
              <Text style={styles.subtitle}>
                Gestiona tu estacionamiento de forma inteligente
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <Input
                label="Correo electrónico"
                placeholder="ejemplo@correo.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                iconName="mail-outline"
              />

              <Input
                label="Contraseña"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                isPassword
                iconName="lock-closed-outline"
              />

              <TouchableOpacity
                onPress={handleForgotPassword}
                style={styles.forgotPassword}
              >
                <Text style={styles.forgotPasswordText}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>

              <Button
                title="Iniciar Sesión"
                onPress={handleLogin}
                variant="secondary"
                fullWidth
                style={styles.loginButton}
              />

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>o</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Continue without account */}
              <Button
                title="Continuar sin cuenta"
                onPress={handleContinueWithoutAccount}
                variant="outline"
                fullWidth
                iconName="public"
                iconColor={Colors.primary}
              />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>¿No tienes una cuenta? </Text>
              <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.registerLink}>Regístrate</Text>
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
  scrollContent: {
    flexGrow: 1,
    minHeight: SCREEN_HEIGHT,
  },
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 480, // Limita el ancho en tablets
    alignSelf: "center",
    paddingHorizontal: SCREEN_WIDTH > 600 ? 48 : 24, // Más padding en tablets
    paddingVertical: SCREEN_HEIGHT > 700 ? 40 : 20, // Ajusta según altura
    justifyContent: "center",
  },
  appName: {
    fontSize: SCREEN_WIDTH > 600 ? 32 : 28,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: SCREEN_HEIGHT > 700 ? 24 : 16,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: SCREEN_HEIGHT > 700 ? 32 : 24,
  },
  logo: {
    width: SCREEN_WIDTH > 600 ? 100 : 80,
    height: SCREEN_WIDTH > 600 ? 100 : 80,
    borderRadius: SCREEN_WIDTH > 600 ? 50 : 40,
    backgroundColor: Colors.textSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: SCREEN_WIDTH > 600 ? 50 : 40,
    fontWeight: "700",
    color: Colors.surface,
  },
  header: {
    alignItems: "center",
    marginBottom: SCREEN_HEIGHT > 700 ? 32 : 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: SCREEN_WIDTH > 600 ? 28 : 24,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: SCREEN_WIDTH > 600 ? 16 : 14,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },
  form: {
    marginBottom: 24,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
    padding: 4, // Área táctil más grande
  },
  forgotPasswordText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  loginButton: {
    marginBottom: 24,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: Colors.textMuted,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap", // Permite salto de línea en pantallas pequeñas
  },
  footerText: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  registerLink: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
});
