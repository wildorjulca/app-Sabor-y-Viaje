// id: 1,
// nombre: "Machu Picchu",
// descripcion: "Una de las maravillas del mundo, famosa por sus ruinas incas y paisajes espectaculares.",
// longitud: -13.1630672,
// precioEntrada: 50.0,
// horarioApertura: "06:00 AM - 05:30 PM",
// destacado: true,
// codRegion: 1, // Cusco
// codCategoria: 1, // Supongamos que corresponde a "Sitio Histórico"
// fechaCreacion: "2025-03-28T12:00:00", // Fecha en formato ISO
// activo: "A",

export interface LugareTuristicoType {
    id: number;
    Nombre: string;
    Descripcion: String;
    Longitud: number;
    PrecioEntrada: number;
    HorarioApertura: string;
    Destacado: boolean; 
    Cod_region?: number
    Cod_categoria?: number;
    FechaCreacion?: string;
    Activo : string;

}


interface Imagen {
    ImagenId: number;
    ImagenUrl: string;
    ImagenOrden: number;
    ImagenEsPrincipal: boolean;
}
export interface LugaresTuristicoPorRegionType {
    Categoria: string;
    Descripcion: string;
    HorarioApertura: string;
    Imagenes: Imagen[] | null;
    Longitud: number | undefined;
    Nombre: string;
    PrecioEntrada: number;
    Region: string;
    id: number;
    idCategoria: number;
    idRegion: number;
}


// TPADO DE LAS INFORMACIONES
export interface ImagenLugar {
    id: number;
    Imagen: string;
}

export interface LugarDetalle {
    LugarID: number;
    NombreLugar: string;
    Descripcion: string;
    Longitud: number;
    PrecioEntrada: number;
    HorarioApertura: string;
    Destacado: boolean;
    Region: string;
    Categoria: string;
}

export interface FotoComentario {
    FotoComentario: string;
    FechaFoto: string;
  }
  
export interface Comentario  {
    IdComentario: number;
    Comentario: string;
    FechaComentario: string; 
    IdUsuario: number;
    Usuario: string;
    FotoPerfil: string | null;
    Valoracion: number | null; 
    FechaValoracion: string | null; 
    FotosComentarios: FotoComentario[];
  };


export interface ApiResponseLugarTuristico {
    status: number;
    succes: boolean; // Nota: Hay un error de ortografía en "success" en tu API
    message: string;
    lugar: LugarDetalle[];
    imagenes: ImagenLugar[];
    comentarios: Comentario[];
    imagenesUsuarios: FotoComentario[]
}