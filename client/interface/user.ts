


export interface UserType {
    id?: number; 
    name: string; 
    email: string; 
    password: string; 
    profilePicture?: string; 
    bio?: string; 
    createdAt?: Date; 
    updatedAt?: Date; 
}

// Interfaz para la estructura del usuario
export interface UserTypes {
    id: number;
    Nombre: string;
    Email: string;
    Contrasena: string;
    FotoPerfil: string | null; // Puede ser null si no hay foto
    FechaRegistro: string; // Fecha en formato ISO 8601
    Activo: string; // Puede ser 'A' para activo
  }
  
  // Interfaz para la estructura de la respuesta de éxito
  export interface ApiResponseUser {
    status: number; // Código HTTP (200, 400, etc.)
    succes: boolean; // Indica si la operación fue exitosa
    mensaje: string; // Mensaje del servidor
    data: UserTypes; // Información del usuario autenticado
  }
  
  // Interfaz para los errores del backend
  export interface ValidationError {
    location: string; // Ubicación del error (por ejemplo, "body")
    msg: string; // Mensaje del error
    path: string; // Campo relacionado con el error
    type: string; // Tipo del error (por ejemplo, "field")
    value?: any; // Valor problemático (opcional)
  }
  
  // Interfaz para los errores específicos de autenticación
  export interface BackendErrorauth {
    message: string; // Mensaje general del error
    success: boolean; // Indica si la operación fue exitosa
    status: number; // Código HTTP del error
    errors?: ValidationError[]; // Errores específicos de validación (opcional)
  }
  