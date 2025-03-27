
import axios, { AxiosError, isAxiosError } from "axios";
import { axiosInstance } from "../axiosInstance ";
import { UserType } from "@/interface/user";
import { LayoutAnimationType } from "react-native-reanimated";


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




export const getUsuario = async (params: { name?: string; page: number; limit: number }): Promise<NewUsuarioResponse> => {
  try {
    const { name, page, limit } = params;

    // Construir la URL directamente con template literals
    const response = await axiosInstance.get(
      `/getUsuario?name=${name || ''}&page=${page}&limit=${limit}`
    );

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<BackendError>;

    if (axiosError.response) {
      throw {
        status: axiosError.response.status,
        message: axiosError.response.data.message || 'Error del servidor',
        errors: axiosError.response.data?.errors,
        success: false,
      };
    }

    throw {
      message: 'Error de conexión',
      status: 500,
      success: false,
    };
  }
};

export const newUsuario = async (usuario: UserType): Promise<NewUsuarioResponse> => {
  try {
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