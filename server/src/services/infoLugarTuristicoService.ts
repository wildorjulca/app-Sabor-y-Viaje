import { conexion } from "../config/conexon"
import sql from 'mssql'

type ServiceError = unknown;



interface Lugar {
    LugarID: number;
    NombreLugar: string;
    Descripcion: string;
    Longitud: number;
    PrecioEntrada: number;
    HorarioApertura: string;
    Destacado: boolean;
    Region: string;
    Categoria: string;
}

interface Imagen {
    id: number;
    Imagen: string;
}

interface FotoComentario {
    FotoComentario: string;
    FechaFoto: string;
}

interface Comentario {
    IdComentario: number;
    Comentario: string;
    FechaComentario: string;
    IdUsuario: number;
    Usuario: string;
    FotoPerfil: string;
    Valoracion: number | null;
    FechaValoracion: string | null;
    FotosComentarios: FotoComentario[];
}
interface ServiceResponse {
    status: number,
    succes: boolean,
    message: string;
    error?: any;
    data?: any[];

}

const infolugaresTuristico = async (idLugarTuristico: number):Promise<ServiceResponse> => {
    let pool: sql.ConnectionPool | undefined
    try {
        pool = await conexion()

        const result = await pool.request()
            .input("idLugarTuristico",sql.Int, idLugarTuristico)
            .execute("informationLT_PA")

        if (result.recordsets) {
            return {
                status: 200,
                succes: true,
                message: "Informacion obtenidas correctamente",
                data: result.recordsets as any,
            }
        }
        return {
            status: 404,
            succes: false,
            message: "Informacion obtenidas correctamente",
        }

    } catch (error: ServiceError) {
        if (error instanceof sql.MSSQLError) {
            return {
                status: 500,
                succes: false,
                message: "Error en la base de datos",
                error: error.message,
            };
        }
        if (error instanceof Error) {
            return {
                status: 500,
                succes: false,
                message: "Error interno en el servidor",
                error: error.message,
            };
        }
        return {
            status: 500,
            succes: false,
            message: "Error desconocido",
            error: "Un error desconocido ocurrió",
        };

    } finally {
        if (pool) {
            pool.close();
        }
    }
}

export { infolugaresTuristico}