import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";

interface ProfileItemProps {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value?: string;
  onPress?: () => void;
  rightIcon?: React.ComponentProps<typeof Ionicons>["name"];
  style?: ViewStyle;
}

export default function ProfileItem({
  icon,
  label,
  value,
  onPress,
  rightIcon = "chevron-forward",
  style,
}: ProfileItemProps) {
  return (
    <TouchableOpacity
      style={[styles.item, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={styles.itemLeft}>
        <Ionicons name={icon} size={20} color={Colors.textMuted} />
        <Text style={styles.itemText}>{label}</Text>
      </View>

      <View style={styles.itemRight}>
        {value ? <Text style={styles.value}>{value}</Text> : null}
        <Ionicons name={rightIcon} size={18} color={Colors.textMuted} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    maxWidth: 220,
    textAlign: "right",
  },
});
