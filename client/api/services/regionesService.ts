import { AxiosError } from "axios";
import { RegionType } from "@/interface/regiones";
import { axiosInstance } from "../axiosInstance ";

export interface BackendError {
    message: string;
    success: boolean;
    status: number;
    errors?: any[]; // Opcionalmente, podrías definir un tipo específico para estos errores
}

interface RegionResponse {
    message: string;
    success: boolean;
    status: number;
    data?: RegionType[];
}

export const getRegiones = async (): Promise<RegionResponse> => {
    try {
        const response = await axiosInstance.get<RegionResponse>('/getRegiones');
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<BackendError>;
        console.log(axiosError)
        if (axiosError.response) {
            throw {
                status: axiosError.response.status,
                message: axiosError.response.data?.message || "Error desconocido",
                errors: axiosError.response.data?.errors || [],
                success: false,
            };
        }
        throw {
            message: "Error de conexión",
            status: 500,
            success: false,
        };
    }
};
