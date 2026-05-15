import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    ActivityIndicator,
    GestureResponderEvent,
    Image,
    ImageSourcePropType,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import { Colors } from "../constants/Colors";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "ghost";

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  iconName?: string;
  iconPosition?: "left" | "right";
  iconColor?: string;
  iconSize?: number;
  imageSource?: ImageSourcePropType;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
}

const Button = ({
  title,
  onPress,
  variant = "primary",
  iconName,
  iconPosition = "left",
  iconColor,
  iconSize = 18,
  imageSource,
  loading = false,
  disabled = false,
  style,
  textStyle,
  fullWidth = false,
}: ButtonProps) => {
  const btnStyle = [
    styles.button,
    styles[variant],
    fullWidth && styles.fullWidth,
    style,
  ];
  const txtStyle = [
    styles.text,
    styles[(variant + "Text") as keyof typeof styles],
    textStyle,
  ];
  const icon = iconName ? (
    <MaterialIcons
      name={iconName as any}
      size={iconSize}
      color={iconColor ?? (variant === "primary" ? "#fff" : Colors.primary)}
    />
  ) : null;

  return (
    <TouchableOpacity
      style={[btnStyle, disabled && styles.disabled]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
      accessibilityRole="button"
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "outline" || variant === "ghost"
              ? Colors.primary
              : "#fff"
          }
        />
      ) : (
        <View
          style={[
            styles.content,
            imageSource ? styles.contentWithImage : undefined,
          ]}
        >
          {icon && iconPosition === "left" && (
            <View style={styles.icon}>{icon}</View>
          )}
          {imageSource && (
            <Image
              source={imageSource}
              style={styles.image}
              resizeMode="contain"
            />
          )}
          <Text style={txtStyle}>{title}</Text>
          {icon && iconPosition === "right" && (
            <View style={styles.icon}>{icon}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  fullWidth: { alignSelf: "stretch" },
  content: { flexDirection: "row", alignItems: "center" },
  contentWithImage: { gap: 8 },
  icon: { marginHorizontal: 5 },
  image: { width: 20, height: 20 },
  text: { fontSize: 16, fontWeight: "600" },

  primary: { backgroundColor: Colors.primary },
  primaryText: { color: "#fff" },

  secondary: { backgroundColor: Colors.navy },
  secondaryText: { color: "#fff" },

  danger: {
    backgroundColor: "#f8d7da",
    borderWidth: 1,
    borderColor: Colors.danger,
  },
  dangerText: { color: Colors.danger },

  outline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  outlineText: { color: Colors.primary },

  ghost: { backgroundColor: "transparent", borderWidth: 0 },
  ghostText: { color: Colors.primary },

  disabled: { opacity: 0.6 },
});

export default Button;