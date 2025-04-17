import { axiosInstance } from "../axiosInstance ";

interface Props {
    cod_usuario: number;
    cod_lugarTuristico: number;
    contenido: string;
}

interface NewComentarioResponse {
    message: string;
    success: boolean;
    status: number;
    data?: any;
}

/**
 * Función para manejar errores de Axios y devolver una respuesta consistente.
 */
const handleAxiosError = (error: any): NewComentarioResponse => {
    if (!error.response) {
        // Error de red o sin respuesta del servidor
        return {
            message: "Error de red: No se pudo conectar con el servidor. Verifica tu conexión a Internet.",
            success: false,
            status: 0,
            data: null,
        };
    }

    // Error en la respuesta del servidor
    return {
        message: error.response.data?.message || "Error al procesar la solicitud.",
        success: false,
        status: error.response.status,
        data: error.response.data || null,
    };
};

/**
 * Servicio para registrar un nuevo comentario.
 */
export const newComentarioService = async ({ cod_lugarTuristico, cod_usuario, contenido }: Props): Promise<NewComentarioResponse> => {
    try {
        // Enviar la solicitud POST al servidor
        const response = await axiosInstance.post("/addComentarios", {
            cod_lugarTuristico,
            cod_usuario,
            contenido
        });

        // Retornar los datos de la respuesta si la solicitud fue exitosa
        return {
            message: response.data.message || "Comentario registrado exitosamente.",
            success: true,
            status: response.status,
            data: response.data.data || null,
        };
    } catch (error: any) {
        // Delegar el manejo del error a la función handleAxiosError
        return handleAxiosError(error);
    }
};
