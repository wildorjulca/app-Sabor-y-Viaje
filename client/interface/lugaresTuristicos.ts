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