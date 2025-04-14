import { AxiosError, isAxiosError } from "axios";
import { axiosInstance } from "../axiosInstance "


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

export const authService = async (email: string, contrasena: string) => {
    let user = { email, contrasena}
    try {
        const response = await axiosInstance.post("/loginUsuario",user)
        return response.data
    } catch (error) {
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
}