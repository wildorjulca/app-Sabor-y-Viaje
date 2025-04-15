import { AxiosError, isAxiosError } from "axios";
import { ApiResponseUser, BackendErrorauth } from "@/interface/user";
import { axiosInstance } from "../axiosInstance ";


export const authService = async (email: string, contrasena: string): Promise<ApiResponseUser> => {
  const user = { email, contrasena };

  try {
    const response = await axiosInstance.post("/loginUsuario", user);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<BackendErrorauth>;
      if (axiosError.response) {
        const serverError = {
          message: axiosError.response.data?.message || "Error del servidor",
          status: axiosError.response.status,
          errors: axiosError.response.data?.errors,
          success: false,
        };
        throw serverError;
      }

      // Manejo de errores sin respuesta (problemas de red, timeout, etc.)
      throw {
        message: "Error de conexión",
        status: 500,
        success: false,
      };
    }

    // Manejo de errores no relacionados con Axios
    throw {
      message: "Error desconocido",
      status: 500,
      success: false,
    };
  }
};
