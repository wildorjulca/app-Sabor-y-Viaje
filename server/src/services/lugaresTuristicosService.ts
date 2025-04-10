import sql from 'mssql'
import { conexion } from '../config/conexon'

interface LugaresTuristico {
    id: number,
    Nombre: string,
    Descripcion: string,
    Longitud?: number,
    PrecioEntrada?: number,
    HorarioApertura: string,
    idRegion: string,
    Region: string,
    idCategoria: number,
    Categoria: string,
    Imagenes: [],
}

interface ServiceResponse {
    status: number,
    success: boolean;
    message: string;
    error?: any;
    data?: LugaresTuristico[];

}

type ServiceError = unknown;

const lugaresTuristicosGetAllService = async (id_region: number): Promise<ServiceResponse> => {
    let pool: sql.ConnectionPool | undefined;
    try {
        pool = await conexion();

        const result = await pool.request()
            .input('tipo', sql.Int, 2)
            .input('id_region', sql.Int, id_region)
            .execute('LugaresTuristicos_PA');

        if (result.recordset && result.recordset.length > 0) {
            return {
                status: 200,
                success: true,
                message: "Lugares turisticos obtenidas correctamente",
                data: result.recordset,
            };
        }
        return {
            status: 404,
            success: false,
            message: "No se encontraron regiones.",
        };

    } catch (error: ServiceError) {
        console.error("Error en regionesGetAllService:", error);

        if (error instanceof sql.MSSQLError) {
            return {
                status: 500,
                success: false,
                message: "Error en la base de datos",
                error: error.message,
            };
        }

        if (error instanceof Error) {
            return {
                status: 500,
                success: false,
                message: "Error interno en el servidor",
                error: error.message,
            };
        }
        return {
            status: 500,
            success: false,
            message: "Error desconocido",
            error: "Un error desconocido ocurrió",
        };
    } finally {
        if (pool) {
            pool.close();
        }
    }
};

export const lugaresByCatService = async (id_region: number,cod_categoria: number): Promise<ServiceResponse> => {
    let pool: sql.ConnectionPool | undefined;
    try {
        pool = await conexion();

        const result = await pool.request()
            .input("tipo", sql.Int, 3)
            .input("id_region", sql.Int, id_region)
            .input("cod_categoria_filtro", sql.Int, cod_categoria)
            .execute("LugaresTuristicos_PA");

        if (result.recordset && result.recordset.length > 0) {
            return {
                status: 200,
                success: true,
                message: "Lugares turisticos obtenidas correctamente",
                data: result.recordset,
            };
        }
        return {
            status: 404,
            success: false,
            message: "No se encontraron regiones con sus categorias.",
        };

    } catch (error: ServiceError) {
        console.error("Error en regionesGetAllService:", error);

        if (error instanceof sql.MSSQLError) {
            return {
                status: 500,
                success: false,
                message: "Error en la base de datos",
                error: error.message,
            };
        }

        if (error instanceof Error) {
            return {
                status: 500,
                success: false,
                message: "Error interno en el servidor",
                error: error.message,
            };
        }
        return {
            status: 500,
            success: false,
            message: "Error desconocido",
            error: "Un error desconocido ocurrió",
        };
    } finally {
        if (pool) {
            pool.close();
        }
    }
};

export { lugaresTuristicosGetAllService }