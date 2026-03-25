import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string; // Ahora es opcional como el de tu compañero
  leftIcon?: React.ReactNode; // Mantenemos el tuyo por compatibilidad
  error?: string; // Extra: para mostrar textos de validación
  iconName?: keyof typeof Ionicons.glyphMap; // Extra: para pasar directo el nombre del ícono
  isPassword?: boolean; // Extra: para activar el ojito de ocultar contraseña
}

export default function Input({
  label,
  leftIcon,
  error,
  iconName,
  isPassword = false,
  style,
  ...props
}: InputProps) {
  // Estado para manejar si la contraseña se ve o no
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* Etiqueta con tus estilos originales (Teal, Mayúsculas) */}
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputContainer, error && styles.inputError]}>
        {/* Renderiza tu ícono personalizado o el nombre del ícono de tu compañero */}
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        {!leftIcon && iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color={Colors.textMuted}
            style={styles.icon}
          />
        )}

        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={Colors.textMuted}
          secureTextEntry={isPassword && !showPassword} // Oculta el texto si es contraseña
          {...props}
        />

        {/* Botón del ojito, solo aparece si le pasas isPassword={true} */}
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={Colors.textMuted}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Mensaje de error (si existe) */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    // Tus estilos de etiqueta originales
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  inputContainer: {
    // Tu contenedor de input original
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  inputError: {
    // Si hay error, el borde se pone rojo
    borderColor: Colors.danger,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  eyeIcon: {
    padding: 4,
    marginLeft: 8,
  },
  errorText: {
    // Estilo para el mensaje de error de tu compañero
    fontSize: 12,
    color: Colors.danger,
    marginTop: 6,
    fontWeight: "500",
  },
});