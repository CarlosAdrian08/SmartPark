import { supabase } from "@/utils/supabase";

export const authService = {
  /**
   * Registro de nuevos clientes.
   * Los metadatos permiten que el trigger 'trg_despues_registro_cliente'
   * cree el perfil en la tabla public.usuario automáticamente.
   */
  async signUp(email: string, password: string, nombre: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre: nombre, // Metadatos para el disparador de la DB[cite: 1]
        },
      },
    });
    if (error) throw error;
    return data;
  },

  /**
   * Inicio de sesión para clientes existentes.
   */
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  /**
   * Cierre de sesión.
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Obtener la sesión actual.
   */
  async getSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  /**
   * Actualizar metadatos del perfil.
   */
  async updateProfile(nombre: string) {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        nombre,
      },
    });
    if (error) throw error;
    return data;
  },

  /**
   * Actualizar correo del usuario.
   */
  async updateEmail(email: string) {
    const { data, error } = await supabase.auth.updateUser({
      email,
    });
    if (error) throw error;
    return data;
  },

  /**
   * Actualizar contraseña.
   */
  async updatePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });
    if (error) throw error;
    return data;
  },

  /**
   * Verificar si el perfil del usuario existe en la tabla 'usuario'.
   */
  async profileExists(userId: string) {
    const { data, error } = await supabase
      .from("usuario")
      .select("id")
      .eq("id", userId)
      .maybeSingle();
  
    if (error) throw error;
    return Boolean(data);
  },

  /**
   * Eliminar datos de perfil del usuario.
   */
  async deleteAccount(userId: string) {
    const tablesToTry = ["usuario", "user"];
    let lastError: any = null;

    for (const table of tablesToTry) {
      const { error } = await supabase.from(table).delete().eq("id", userId);
      if (!error) {
        return;
      }
      lastError = error;
    }

    if (lastError) throw lastError;
  },
};
