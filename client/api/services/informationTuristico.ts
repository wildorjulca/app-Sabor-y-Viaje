import { AxiosError } from "axios";
import { axiosInstance } from "../axiosInstance ";
import { ApiResponseLugarTuristico } from "@/interface/lugaresTuristicos";

export interface BackendError {
    message: string;
    success: boolean;
    status: number;
    errors: any[];
}


export const getInformationLugarTuristico = async (id: number): Promise<ApiResponseLugarTuristico> => {
    try {
        const response = await axiosInstance.get(`/infoLugarTuristico/${id}`);
        return response.data as ApiResponseLugarTuristico
    } catch (error) {
        const axiosError = error as AxiosError<BackendError>;
        if (axiosError.response) {
            throw {
                message: axiosError.response.data.message || axiosError.message,
                success: false,
                status: axiosError.response.status,
                errors: axiosError.response.data.errors || []
            };
        }
        throw {
            message: "Error de conexión",
            status: 500,
            success: false,
            errors: []
        };
    }
};