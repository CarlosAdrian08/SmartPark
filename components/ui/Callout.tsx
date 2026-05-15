import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function Callout({
  title,
  subtitle,
  iconName,
}: {
  title: string;
  subtitle: string;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
}) {
  return (
    <View style={styles.infoBox}>
      <View style={styles.infoIconContainer}>
        <Ionicons name={iconName} size={24} color={Colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF8FF",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 12,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    // borderRadius: 20,
    backgroundColor: "#D1E9F6",
    // backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",

    padding: 10,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  infoSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
  },
});
