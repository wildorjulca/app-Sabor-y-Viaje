
import { AxiosError, isAxiosError } from "axios";
import { axiosInstance } from "../axiosInstance ";
import { UserType } from "@/interface/user";


interface ValidationError {
  location: string;
  msg: string; // Mensaje del error
  path: string; // Campo al que pertenece el error
  type: string;
  value?: any;
}


export interface BackendError {
  message: string;
  success: boolean;
  status: number;
  errors?: ValidationError[];
}

interface NewUsuarioResponse {
  message: string;
  success: boolean;
  status: number;
  data?: any;
}

export const newUsuario = async (usuario: UserType): Promise<NewUsuarioResponse> => {
  try {
    console.log(usuario)
    const response = await axiosInstance.post<NewUsuarioResponse>("/postUsuario", usuario);
    console.log(response)
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<BackendError>;

      // Error con respuesta del servidor
      if (axiosError.response) {
        const serverError = {
          message: axiosError.response.data?.message || 'Error del servidor',
          status: axiosError.response.status,
          errors: axiosError.response.data?.errors,
          success: false
        };
        throw serverError;
      }

      // Error sin respuesta (network, timeout, etc.)
      throw {
        message: 'Error de conexión',
        status: 500,
        success: false
      };
    }

    // Error no relacionado a Axios
    throw {
      message: 'Error desconocido',
      status: 500,
      success: false
    };
  }
};