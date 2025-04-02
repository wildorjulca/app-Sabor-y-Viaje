import { conexion } from "../config/conexon";
import sql from 'mssql';

interface CategoriasLuagres {
    id: number;
    Nombre: string;
    Icono: string;
    Descripcion: string;
    Estado: string
}

interface ServiceResponse {
    status: number;
    success: boolean;
    mensaje: string;
    error?: any;
    data?: CategoriasLuagres[]; // Si el tipo de dato es una lista de Regiones
}
type ServiceError = unknown;
const categoriasLugaresGetAllService = async (): Promise<ServiceResponse> => {
    let pool: sql.ConnectionPool | undefined
    try {
        pool = await conexion()
        const result = await pool.request()
            .input('tipo', sql.Int, 1)
            .execute('CategoriasLugares_PA')

        if (result.recordset && result.recordset.length > 0) {
            return {
                status: 200,
                success: true,
                mensaje: "Categorias Lugares obtenidas correctamente",
                data: result.recordset
            }
        }
        return {
            status: 404,
            success: false,
            mensaje: "No se encontraron regiones.",
        }


    } catch (error: ServiceError) {
        if (error instanceof sql.MSSQLError) {
            return {
                status: 500,
                success: false,
                mensaje: "Error en la base de datos",
                error: error.message,
            }
        }
        if (error instanceof Error) {
            return {
                status: 500,
                success: false,
                mensaje: "Error interno en el servidor",
                error: error.message,
            };
        }
        return {
            status: 500,
            success: false,
            mensaje: "Error desconocido",
            error: "Un error desconocido ocurrió",
        };

    } finally {
        if (pool) {
            pool.close()
        }
    }
}

export { categoriasLugaresGetAllService }