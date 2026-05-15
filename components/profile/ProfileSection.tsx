import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface ProfileSectionProps {
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function ProfileSection({ title, children, style }: ProfileSectionProps) {
  return (
    <View style={[styles.section, style]}>
      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
      <View style={styles.card}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
