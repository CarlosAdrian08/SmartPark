import React from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";
import Button from "./Button";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "ghost";

interface ModalAction {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
}

interface ReusableModalProps {
  visible: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children?: React.ReactNode;
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
  contentStyle?: ViewStyle;
  dismissable?: boolean;
}

export default function ReusableModal({
  visible,
  title,
  description,
  onClose,
  children,
  primaryAction,
  secondaryAction,
  contentStyle,
  dismissable = true,
}: ReusableModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.backdrop}
        onPress={dismissable ? onClose : undefined}
      />

      <View style={styles.centeredView}>
        <View style={[styles.modalView, contentStyle]}>
          <Text style={styles.title}>{title}</Text>
          {description ? (
            <Text style={styles.description}>{description}</Text>
          ) : null}
          <View style={styles.content}>{children}</View>

          <View style={styles.actions}>
            {secondaryAction ? (
              <Button
                title={secondaryAction.label}
                onPress={secondaryAction.onPress}
                variant={secondaryAction.variant ?? "outline"}
                loading={secondaryAction.loading}
                disabled={secondaryAction.disabled}
                fullWidth
              />
            ) : null}

            {primaryAction ? (
              <Button
                title={primaryAction.label}
                onPress={primaryAction.onPress}
                variant={primaryAction.variant ?? "primary"}
                loading={primaryAction.loading}
                disabled={primaryAction.disabled}
                fullWidth
              />
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalView: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111827",
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 16,
    lineHeight: 20,
  },
  content: {
    marginBottom: 16,
  },
  actions: {
    gap: 10,
  },
});
