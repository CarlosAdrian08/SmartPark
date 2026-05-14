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
};
