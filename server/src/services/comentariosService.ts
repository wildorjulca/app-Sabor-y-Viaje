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
  data?: any; // Para incluir el ID insertado
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
      .output("new_id", sql.Int) // Define el parámetro de salida
      .execute("Comentarios_PA");

    const newId = result.output.new_id; // Recupera el ID insertado

    return {
      status: 200,
      success: true,
      message: "Su comentario fue grabado exitosamente.",
      data: newId, // Incluye el ID en la respuesta
    };
  } catch (error) {
    if (error instanceof sql.MSSQLError) {
      return {
        status: 500,
        success: false,
        message: "Error en la base de datos al intentar grabar el comentario.",
        error: error.message,
      };
    }

    if (error instanceof Error) {
      return {
        status: 500,
        success: false,
        message: "Error interno en el servidor al procesar el comentario.",
        error: error.message,
      };
    }

    return {
      status: 500,
      success: false,
      message: "Un error desconocido ocurrió durante el procesamiento.",
      error: "Error desconocido",
    };
  } finally {
    if (pool) {
      pool.close();
    }
  }
};

export { newComentarioService };
