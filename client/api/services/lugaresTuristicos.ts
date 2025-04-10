


export interface BackendError {
    message: string;
    success: boolean;
    status: number;
    errors: any[]
}

interface LugaresTuristico {
    id: number,
    Nombre : string,
    Descripcion: string,
    Longitud? : number,
    PrecioEntrada?: number,
    HorarioApertura: string,
    idRegion: string,
    Region: string,
    idCategoria: number ,
    Categoria: string,
    Imagenes : [],
}
interface LugaresTuristicosResponse  {
    message: string;
    success: boolean;
    status: number;
    data: LugaresTuristico[] 
}

import { AxiosError } from "axios"
import { axiosInstance } from "../axiosInstance "



export const getLugaresTuristicos = async (cod_region: number): Promise<LugaresTuristicosResponse> => {
    try {
        const response = await axiosInstance.get(`/getLugaresTuristicos/${cod_region}`)
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError<BackendError>
        if(axiosError.response){
            throw {
                message: axiosError.message,
                success: false,
                status: axiosError.status,
                errors: axiosError.response.data.errors
            }
        }
        throw {
            message: "Error de conexión",
            status: 500,
            success: false,
        };

    }

}



export const getFiltroByCategoria = async (idRegion: number, codCategoria: number): Promise<LugaresTuristicosResponse> => {
    try {
        const response = await axiosInstance.get(`/getLugaresTuristicosCategoria?idRegion=${idRegion}&codCategoria=${codCategoria}`)
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError<BackendError>
        if(axiosError.response){
            throw {
                message: axiosError.message,
                success: false,
                status: axiosError.status,
                errors: axiosError.response.data.errors
            }
        }
        throw {
            message: "Error de conexión",
            status: 500,
            success: false,
        };

    }

}