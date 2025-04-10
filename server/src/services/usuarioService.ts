import sql from 'mssql';
import { conexion } from '../config/conexon';
import bcrypt from 'bcrypt'


interface UserType {
    id?: number; // Identificador único del usuario
    name: string; // Nombre del usuario
    email: string; // Correo electrónico (único)
    password: string; // Contraseña (encriptada)
    profilePicture?: string; // URL de la foto de perfil (opcional)
    bio?: string; // Biografía del usuario (opcional)
    createdAt?: Date; // Fecha de registro
    updatedAt?: Date; // Fecha de última actualización
  }
  
   

  const usuarioPostService = async (user: UserType) => {
    const pool = await conexion();
    try {
        const passwordHash = bcrypt.hashSync(user.password, 10)

        const result = await pool.request()
            .input('name', sql.NVarChar, user.name)
            .input('email', sql.NVarChar, user.email)
            .input('password', sql.NVarChar, passwordHash)
            .input('profile_picture', sql.NVarChar, user.profilePicture)
            .input('bio', sql.NVarChar, user.bio)
            .execute('POST_PESONA_SAVE_PA');

        // Verificar si una fila fue afectada
        if (result.rowsAffected[0] > 0) {
            return {
                status: 201,
                success: true,
                mensaje: "Usuario guardado correctamente",
            };
        } else {
            return {
                status: 400,
                success: false,
                mensaje: "No se pudo guardar el usuario",
            };
        }
    } catch (error) {
        console.error("Error en usuarioPostService:", error);
        return {
            status: 500,
            success: false,
            mensaje: "Error de servidor o en la base de datos",
            error: error,
        };
    } finally {
        pool.close();
    }
};


const usuarioGetAllService = async (name: string, page: number, limit:number) => {
    const pool = await conexion(); 
    try {
        const result = await pool
            .request()
            .input('name', sql.VarChar, name) 
            .input('page', sql.Int, page)
            .input('limit', sql.Int, limit)
            .execute('getUserAll_PR'); 
        
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

export { usuarioGetAllService ,usuarioPostService};
