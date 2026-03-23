// Pantalla de Recuperación de Contraseña
import HeaderSecondary from "@/components/shared/HeaderSecondary";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleResetPassword = () => {
    console.log("Enviando instrucciones a:", email);
    setEmail("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <HeaderSecondary title="Recuperar Contraseña" />

        <View style={styles.content}>
          <Text style={styles.title}>
            ¿Olvidaste tu <Text style={styles.titleHighlight}>acceso?</Text>
          </Text>
          <Text style={styles.description}>
            Ingresa tu correo electrónico y te enviaremos las instrucciones para
            restablecer tu contraseña.
          </Text>

          <View style={styles.card}>
            <Input
              label="Correo electrónico"
              placeholder="ejemplo@correo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              leftIcon={<Ionicons name="mail-outline" size={20} color={Colors.textMuted} />}
            />
            
            {/* Botón de envío */}
            <Button
              title="Enviar instrucciones"
              onPress={handleResetPassword}
              variant="primary"
              disabled={!email}
              iconName="send"
              iconPosition="right"
              iconColor={Colors.surface}
              fullWidth
            />
          </View>

          <View style={styles.footer}>
             {/* Botón para volver a la pantalla de inicio de sesión */}
            <Button
              title="Volver a Iniciar Sesión"
              onPress={() => router.back()}
              variant="ghost"
              iconName="login"
              iconColor={Colors.primary}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  titleHighlight: {
    color: Colors.primary,
  },
  description: {
    fontSize: 15,
    color: Colors.textMuted,
    lineHeight: 22,
    marginBottom: 30,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  footer: {
    marginTop: "auto",
    marginBottom: 40,
    alignItems: "center",
  },
});