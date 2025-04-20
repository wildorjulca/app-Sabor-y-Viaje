import { conexion } from "../config/conexon";
import sql from 'mssql'
export interface Image {
  // id?: number;
  Cod_comentario: number,
  Cod_usuario: number,
  // public_id: string;
  URLImagen: string;
  // created_at?: Date;
}

export const createImage = async (image: Image): Promise<Image> => {
  try {
    const pool = await conexion();
    const result = await pool.request()
      .input('Cod_comentario', sql.Int, image.Cod_comentario)
      .input('Cod_usuario', sql.Int, image.Cod_usuario)
      .input('URLImagen', sql.VarChar, image.URLImagen)
      .query(`
        INSERT INTO FotosComentarios (Cod_comentario,Cod_usuario,URLImagen)
        OUTPUT INSERTED.*
        VALUES (@Cod_comentario, @Cod_usuario, @URLImagen)
      `);
    return result.recordset[0];
  } catch (error) {
    console.error('Error creating image record:', error);
    throw error;
  }
};