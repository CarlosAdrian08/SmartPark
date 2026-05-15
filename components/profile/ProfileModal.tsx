import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { Colors } from "@/constants/Colors";
import React, { useMemo } from "react";
import { StyleSheet, Text } from "react-native";

type ProfileModalMode =
  | "editName"
  | "editEmail"
  | "changePassword"
  | "deleteAccount"
  | null;

interface ProfileModalProps {
  visible: boolean;
  modalType: ProfileModalMode;
  modalError: string | null;
  modalLoading: boolean;
  nameInput: string;
  emailInput: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  setNameInput: (value: string) => void;
  setEmailInput: (value: string) => void;
  setCurrentPassword: (value: string) => void;
  setNewPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  onClose: () => void;
  onPrimaryAction: () => void;
}

export default function ProfileModal({
  visible,
  modalType,
  modalError,
  modalLoading,
  nameInput,
  emailInput,
  currentPassword,
  newPassword,
  confirmPassword,
  setNameInput,
  setEmailInput,
  setCurrentPassword,
  setNewPassword,
  setConfirmPassword,
  onClose,
  onPrimaryAction,
}: ProfileModalProps) {
  const modalTitle = useMemo(() => {
    switch (modalType) {
      case "editName":
        return "Editar nombre";
      case "editEmail":
        return "Cambiar correo";
      case "changePassword":
        return "Cambiar contraseña";
      case "deleteAccount":
        return "Eliminar cuenta";
      default:
        return "";
    }
  }, [modalType]);

  const modalDescription = useMemo(() => {
    switch (modalType) {
      case "editName":
        return "Actualiza tu nombre para que aparezca en tu perfil.";
      case "editEmail":
        return "Ingresa el nuevo correo que quieres usar para iniciar sesión.";
      case "changePassword":
        return "Cambia tu contraseña para mantener tu cuenta segura.";
      case "deleteAccount":
        return "Esta acción es irreversible. Se eliminarán tus datos de usuario.";
      default:
        return "";
    }
  }, [modalType]);

  const modalPrimaryLabel = useMemo(() => {
    switch (modalType) {
      case "editName":
        return "Guardar nombre";
      case "editEmail":
        return "Guardar correo";
      case "changePassword":
        return "Guardar contraseña";
      case "deleteAccount":
        return "Eliminar cuenta";
      default:
        return "Cerrar";
    }
  }, [modalType]);

  const renderContent = () => {
    switch (modalType) {
      case "editName":
        return (
          <Input
            label="Nombre"
            value={nameInput}
            onChangeText={setNameInput}
            placeholder="Ingresa tu nombre"
          />
        );
      case "editEmail":
        return (
          <Input
            label="Correo electrónico"
            value={emailInput}
            onChangeText={setEmailInput}
            placeholder="Ingresa tu correo"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        );
      case "changePassword":
        return (
          <>
            <Input
              label="Contraseña actual"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Ingresa tu contraseña actual"
              isPassword
            />
            <Input
              label="Nueva contraseña"
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Ingresa la nueva contraseña"
              isPassword
            />
            <Input
              label="Confirmar nueva contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Repite la nueva contraseña"
              isPassword
            />
          </>
        );
      case "deleteAccount":
        return (
          <Text style={styles.deleteReminder}>
            Al eliminar tu cuenta se perderán todos tus datos de usuario. Esta acción no se puede deshacer.
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      title={modalTitle}
      description={modalDescription}
      onClose={onClose}
      dismissable={!modalLoading}
      secondaryAction={{
        label: "Cancelar",
        onPress: onClose,
        variant: "outline",
        disabled: modalLoading,
      }}
      primaryAction={{
        label: modalPrimaryLabel,
        onPress: onPrimaryAction,
        variant: modalType === "deleteAccount" ? "danger" : "primary",
        loading: modalLoading,
      }}
    >
      {renderContent()}
      {modalError ? <Text style={styles.modalError}>{modalError}</Text> : null}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalError: {
    color: Colors.danger,
    marginTop: 8,
    fontSize: 13,
    textAlign: "center",
  },
  deleteReminder: {
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 20,
  },
});
