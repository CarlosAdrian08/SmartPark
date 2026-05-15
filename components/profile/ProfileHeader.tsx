import Avatar from "@/components/ui/Avatar";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProfileHeaderProps {
  name: string;
  email: string;
}

export default function ProfileHeader({ name, email }: ProfileHeaderProps) {
  return (
    <View style={styles.root}>
      <Avatar name={name} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
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
    marginTop: 4,
  },
});
