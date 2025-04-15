import { create } from "zustand";
import { authService } from "@/api/services/authService";
import { showMessage } from "react-native-flash-message";
import { UserTypes } from "@/interface/user";
import { NavigationProp } from "@react-navigation/native";

// Define la interfaz para los errores de validación individuales
interface ValidationError {
    location: string;
    msg: string; // Mensaje de error
    path: string; // Campo al que pertenece el error
    type: string; // Tipo de error
    value: string; // Valor del campo
}


// Define el tipo de BackendErrorauth para manejar errores del backend
export interface BackendErrorauth {
    status: number; // Código de estado HTTP (400, 401, etc.)
    errors?: ValidationError[]; // Lista de errores de validación (opcional)
    message?: string; // Mensaje general del backend
    success?: boolean; // Estado de éxito devuelto por el backend
}

// Define la interfaz para la tienda de Zustand
interface Store {
    loading: boolean;
    isAuthenticated: boolean; // Estado de autenticación
    user: UserTypes; // Información del usuario
    error: { [key: string]: string }; // Mapeo de errores de validación
    authenticateUser: (email: string, contrasena: string) => Promise<void>
}


export const useAuthStore = create<Store>((set, get) => ({
    loading: false,
    isAuthenticated: false,
    user: {
        Activo: "",
        Contrasena: "",
        Email: "",
        FechaRegistro: "",
        FotoPerfil: "",
        Nombre: "",
        id: 0,
    },
    error: {}, // Estado inicial para errores de validación

    authenticateUser: async (email, contrasena) => {
        try {
            set({ loading: true }); // Establece estado de carga
            const response = await authService(email, contrasena);
            if (response && response.data) {
                const objectUser = {
                    Activo: response.data.Activo,
                    Contrasena: response.data.Contrasena,
                    Email: response.data.Email,
                    FechaRegistro: response.data.FechaRegistro,
                    FotoPerfil: response.data.FotoPerfil,
                    Nombre: response.data.Nombre,
                    id: response.data.id,
                };
                set({
                    isAuthenticated: true,
                    user: objectUser,
                    error: {}, // Limpia los errores
                    loading: false, // Detiene la carga
                });
                // Muestra un mensaje de éxito
                showMessage({
                    message: "Bienvenido",
                    description: `Hola, ${response.data.Nombre}`,
                    type: "success",
                });
                // const navigation = useNavigation()
                // navigation.goBack()

            }



        } catch (error) {
            const backendError = error as BackendErrorauth;
            console.log(backendError)
            if (backendError.status === 401) {
                // Manejo de errores de autenticación
                set({
                    error: { general: "Credenciales incorrectas" },
                    loading: false,
                });
                showMessage({
                    message: "Error de autenticación",
                    description: "Credenciales incorrectas",
                    type: "danger",
                });
            } else if (backendError.status === 400) {
                // Manejo de errores de validación
                const validationErrors: { [key: string]: string } = {};
                backendError.errors?.forEach((item) => {
                    validationErrors[item.path] = item.msg;
                });
                set({
                    error: validationErrors,
                    loading: false,
                });
            } else {
                // Manejo de errores del servidor
                set({
                    error: { general: "Error en el servidor, intenta más tarde" },
                    loading: false,
                });
                showMessage({
                    message: "Error del servidor",
                    description: "Ocurrió un problema en el servidor, por favor intenta más tarde.",
                    type: "danger",
                });
            }
        } finally {
            set({ loading: false }); // Detiene la carga en todos los casos
        }
    },
}));
