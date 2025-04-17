import sql from "mssql";
import { conexion } from "../config/conexon";

interface Comentario {
    cod_usuario: number;
    cod_lugarTuristico: number;
    contenido: string;
}

interface ServiceResponse {
    status: number;
    success: boolean;
    message: string;
    error?: any;
}

const newComentarioService = async (comentario: Comentario): Promise<ServiceResponse> => {
    let pool: sql.ConnectionPool | undefined;
    try {
        pool = await conexion(); 
        if (!pool) {
            throw new Error("No se pudo establecer una conexión con la base de datos.");
        }

        const result = await pool.request()
            .input("tipo", sql.Int, 1) 
            .input("cod_usuario", sql.Int, comentario.cod_usuario)
            .input("cod_lugarTuristico", sql.Int, comentario.cod_lugarTuristico)
            .input("contenido", sql.NVarChar, comentario.contenido)
            .execute("Comentarios_PA");

        if (result.rowsAffected[0] === 1) {
            return {
                status: 200,
                success: true,
                message: "Su comentario fue grabado exitosamente.",
            };
        } else {
            return {
                status: 400,
                success: false,
                message: "No se pudo grabar el comentario. Verifique los datos enviados.",
            };
        }
    } catch (error) {
        if (error instanceof sql.MSSQLError) {
            return {
                status: 500,
                success: false,
                message: "Error en la base de datos al intentar grabar el comentario.",
                error: error.message,
            };
        }

        // Manejo de errores genéricos
        if (error instanceof Error) {
            return {
                status: 500,
                success: false,
                message: "Error interno en el servidor al procesar el comentario.",
                error: error.message,
            };
        }

        // Manejo de errores desconocidos
        return {
            status: 500,
            success: false,
            message: "Un error desconocido ocurrió durante el procesamiento.",
            error: "Error desconocido",
        };
    } finally {
        // Liberar la conexión a la base de datos
        if (pool) {
            pool.close();
        }
    }
};

export { newComentarioService };
