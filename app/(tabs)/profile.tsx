import HeaderSecondary from "@/components/shared/HeaderSecondary";
import Button from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import {
  ProfileHeader,
  ProfileItem,
  ProfileModal,
  ProfileSection,
} from "@/components/profile";
import { useProfileScreen } from "@/hooks/useProfileScreen";

export default function ProfileScreen() {
  const router = useRouter();
  const {
    session,
    displayName,
    displayEmail,
    loading,
    modalType,
    modalLoading,
    modalError,
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
    openModal,
    closeModal,
    handleLogout,
    handleUpdateName,
    handleUpdateEmail,
    handleUpdatePassword,
    handleDeleteAccount,
  } = useProfileScreen();

  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderSecondary title="Perfil de Usuario" />

        <ProfileHeader name={displayName} email={displayEmail} />

        <ProfileSection title="CONFIGURACIÓN">
          <ProfileItem
            icon="person-outline"
            label="Nombre"
            value={displayName}
            onPress={() => openModal("editName")}
          />
          <ProfileItem
            icon="mail-outline"
            label="Correo"
            value={displayEmail}
            onPress={() => openModal("editEmail")}
          />
          <ProfileItem
            icon="lock-closed-outline"
            label="Contraseña"
            onPress={() => openModal("changePassword")}
          />
          <ProfileItem icon="globe-outline" label="Idioma" value="Español" />
        </ProfileSection>

        <ProfileSection title="AYUDA">
          <ProfileItem
            icon="warning-outline"
            label="Eliminar Cuenta"
            onPress={() => openModal("deleteAccount")}
          />
          <ProfileItem icon="help-circle-outline" label="Soporte" />
          <ProfileItem icon="document-text-outline" label="Términos y Condiciones" />
        </ProfileSection>

        <ProfileSection>
          {session ? (
            <Button
              title="Cerrar Sesión"
              variant="danger"
              iconName="logout"
              iconColor="red"
              onPress={handleLogout}
              loading={loading}
              disabled={loading}
            />
          ) : (
            <Button
              title="Iniciar Sesión"
              variant="secondary"
              onPress={() => router.replace("/(auth)/login")}
            />
          )}
        </ProfileSection>
      </ScrollView>

      <ProfileModal
        visible={modalType !== null}
        modalType={modalType}
        modalError={modalError}
        modalLoading={modalLoading}
        nameInput={nameInput}
        emailInput={emailInput}
        currentPassword={currentPassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        setNameInput={setNameInput}
        setEmailInput={setEmailInput}
        setCurrentPassword={setCurrentPassword}
        setNewPassword={setNewPassword}
        setConfirmPassword={setConfirmPassword}
        onClose={closeModal}
        onPrimaryAction={() => {
          switch (modalType) {
            case "editName":
              return handleUpdateName();
            case "editEmail":
              return handleUpdateEmail();
            case "changePassword":
              return handleUpdatePassword();
            case "deleteAccount":
              return handleDeleteAccount();
            default:
              return;
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
