import { conexion } from "../config/conexon"
import sql from 'mssql'

type ServiceError = unknown;
interface ServiceResponse {
    status: number,
    succes: boolean,
    message: string;
    error?: any;
    data?: any[];

}
const infolugaresTuristico = async ():Promise<ServiceResponse> => {
    let pool: sql.ConnectionPool | undefined
    try {
        pool = await conexion()

        const result = await pool.request()
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