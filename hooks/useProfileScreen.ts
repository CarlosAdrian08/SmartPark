import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";

type ProfileModalMode =
  | "editName"
  | "editEmail"
  | "changePassword"
  | "deleteAccount"
  | null;

export function useProfileScreen() {
  const router = useRouter();
  const {
    session,
    user,
    signOut,
    exitGuest,
    updateProfile,
    updateEmail,
    updatePassword,
    deleteAccount,
    refreshSession,
  } = useAuth();

  const displayName = user?.user_metadata?.nombre ?? "Invitado";
  const displayEmail = user?.email ?? "Sin cuenta";

  const [modalType, setModalType] = useState<ProfileModalMode>(null);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState(displayName);
  const [emailInput, setEmailInput] = useState(user?.email ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setNameInput(displayName);
    setEmailInput(user?.email ?? "");
  }, [displayName, user?.email]);

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

  const resetForm = () => {
    setModalError(null);
    setNameInput(displayName);
    setEmailInput(user?.email ?? "");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const closeModal = () => {
    setModalType(null);
    setModalError(null);
    setModalLoading(false);
  };

  const openModal = (type: ProfileModalMode) => {
    if (!session && type !== null) {
      router.replace("/(auth)/login");
      return;
    }

    resetForm();
    setModalType(type);
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      await signOut();
      exitGuest();
      router.replace("/(auth)/login");
    } catch (error: any) {
      Alert.alert("No se pudo cerrar la sesión", error?.message ?? "Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateName = async () => {
    if (!nameInput.trim()) {
      setModalError("El nombre no puede estar vacío.");
      return;
    }

    setModalLoading(true);
    setModalError(null);

    try {
      await updateProfile(nameInput.trim());
      await refreshSession();
      closeModal();
      Alert.alert("Nombre actualizado", "Tu nombre se actualizó correctamente.");
    } catch (error: any) {
      setModalError(error?.message ?? "No se pudo actualizar el nombre.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleUpdateEmail = async () => {
    const emailValue = emailInput.trim();

    if (!emailValue) {
      setModalError("El correo no puede estar vacío.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(emailValue)) {
      setModalError("Ingresa un correo válido.");
      return;
    }

    setModalLoading(true);
    setModalError(null);

    try {
      await updateEmail(emailValue);
      await refreshSession();
      closeModal();
      Alert.alert("Correo actualizado", "Tu correo se actualizó correctamente.");
    } catch (error: any) {
      setModalError(error?.message ?? "No se pudo actualizar el correo.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      setModalError("Completa todos los campos de contraseña.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setModalError("Las contraseñas no coinciden.");
      return;
    }

    if (newPassword.length < 6) {
      setModalError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setModalLoading(true);
    setModalError(null);

    try {
      await updatePassword(newPassword);
      closeModal();
      Alert.alert("Contraseña actualizada", "Tu contraseña se actualizó correctamente.");
    } catch (error: any) {
      setModalError(error?.message ?? "No se pudo actualizar la contraseña.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user?.id) {
      setModalError("No se pudo eliminar la cuenta: usuario no encontrado.");
      return;
    }

    setModalLoading(true);
    setModalError(null);

    try {
      await deleteAccount(user.id);
      await signOut();
      exitGuest();
      router.replace("/(auth)/login");
    } catch (error: any) {
      setModalError(error?.message ?? "No se pudo eliminar la cuenta.");
    } finally {
      setModalLoading(false);
    }
  };

  return {
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
    modalTitle,
    modalDescription,
    modalPrimaryLabel,
    openModal,
    closeModal,
    handleLogout,
    handleUpdateName,
    handleUpdateEmail,
    handleUpdatePassword,
    handleDeleteAccount,
  };
}
