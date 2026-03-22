import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

/* Componente Avatar */
const Avatar = ({ name }: { name: string }) => {
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,

    // Borde blanco grueso
    borderWidth: 4,
    borderColor: "#fff",
    // Sombra suave para dar profundidad
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  avatarText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
});

export default Avatar;
