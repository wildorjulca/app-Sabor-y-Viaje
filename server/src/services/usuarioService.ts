import sql from 'mssql';
import { conexion } from '../config/conexon';

const usuarioGetAllService = async (filtro: string) => {
    const pool = await conexion(); // Conexión al pool
    try {
        // Llamada al procedimiento almacenado `getAllUsuario` con el parámetro `filtro`
        const result = await pool
            .request()
            .input('filtro', sql.VarChar, filtro) // Asignar el parámetro `filtro`
            .execute('GetPersona'); // Nombre del procedimiento almacenado
        
        if (result.recordset.length > 0) {
            return { status: 200, succes: true, data: result.recordset };
        }
        return {
            status: 404,
            succes: false,
            data: [],
            mensaje: "No hay datos",
        };
    } catch (error) {
        console.error("Error en usuarioGetAllService:", error);
        return {
            status: 500,
            succes: false,
            mensaje: "Error de servidor o en la base de datos",
            error: error,
        };
    } finally {
        pool.close(); // Cerrar la conexión al pool
    }
};

export { usuarioGetAllService };
