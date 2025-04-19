import { conexion } from "../config/conexon";
import sql from 'mssql'
export interface Image {
  id?: number;
  public_id: string;
  url: string;
  created_at?: Date;
}

export const createImage = async (image: Image): Promise<Image> => {
  try {
    const pool = await conexion();
    const result = await pool.request()
      .input('public_id', sql.VarChar, image.public_id)
      .input('url', sql.VarChar, image.url)
      .query(`
        INSERT INTO Images (public_id, url)
        OUTPUT INSERTED.*
        VALUES (@public_id, @url)
      `);
    return result.recordset[0];
  } catch (error) {
    console.error('Error creating image record:', error);
    throw error;
  }
};