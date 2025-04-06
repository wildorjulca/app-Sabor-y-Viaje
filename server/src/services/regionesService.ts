import sql from 'mssql';
import { conexion } from '../config/conexon';

// Definir el tipo para el resultado esperado
interface Region {
    id: number;
    Nombre: string;
    Decripcion: string;
    ImagenPortada: string;
    Clima: string;
    MejorEpocaVisita: string;
    FechaCreacion?: Date;
    FechaActualizacion?: Date | null;
    Activo?: string;
}

interface ServiceResponse {
    status: number;
    success: boolean;
    message: string;
    error?: any;
    data?: Region[]; // Si el tipo de dato es una lista de Regiones
}

// Tipo para el error, puede ser un `Error` estándar o un error de SQL
type ServiceError = unknown;

const regionesGetAllService = async (): Promise<ServiceResponse> => {
    let pool: sql.ConnectionPool | undefined;
    try {
        // Establecer la conexión
        pool = await conexion();

        // Ejecutar el procedimiento almacenado sin parámetros
        const result = await pool.request()
            .input('tipo', sql.Int, 1)
            .execute('dbo.Regiones_pa');


        // Si se encontraron resultados
        if (result.recordset && result.recordset.length > 0) {
            return {
                status: 200,
                success: true,
                message: "Regiones obtenidas correctamente",
                data: result.recordset, // Regresar las regiones obtenidas
            };
        }

        // Si no se encuentran resultados
        return {
            status: 404,
            success: false,
            message: "No se encontraron regiones.",
        };

    } catch (error: ServiceError) {
        // Manejo de errores más detallado
        console.error("Error en regionesGetAllService:", error);

        // Verificar si el error es un objeto con la propiedad 'message'
        if (error instanceof sql.MSSQLError) {
            return {
                status: 500,
                success: false,
                message: "Error en la base de datos",
                error: error.message,
            };
        }

        // Si el error es desconocido, simplemente devolvemos el mensaje
        if (error instanceof Error) {
            return {
                status: 500,
                success: false,
                message: "Error interno en el servidor",
                error: error.message,
            };
        }

        // Si el error no es un Error estándar o MSSQLError
        return {
            status: 500,
            success: false,
            message: "Error desconocido",
            error: "Un error desconocido ocurrió",
        };
    } finally {
        // Asegurarse de cerrar la conexión
        if (pool) {
            pool.close();
        }
    }
};

export { regionesGetAllService };
