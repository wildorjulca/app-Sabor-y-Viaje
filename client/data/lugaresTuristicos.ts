import { LugareTuristicoType } from "@/interface/lugaresTuristicos";

export const lugaresTuristicosCusco: LugareTuristicoType[] = [
    {
        id: 1,
        Nombre: "Machu Picchu",
        Descripcion: "Una de las maravillas del mundo, famosa por sus ruinas incas y paisajes espectaculares.",
        Longitud: -13.1630672,
        PrecioEntrada: 50.0,
        HorarioApertura: "06:00 AM - 05:30 PM",
        Destacado: true,
        Cod_region: 1, // Cusco
        Cod_categoria: 1, // Supongamos que corresponde a "Sitio Histórico"
        Activo: "A",
    },
    {
        id: 2,
        Nombre: "Valle Sagrado",
        Descripcion: "Un conjunto de pueblos y sitios arqueológicos rodeados por montañas impresionantes.",
        Longitud: -13.329035,
        PrecioEntrada: 20.0,
        HorarioApertura: "Todo el día",
        Destacado: false,
        Cod_region: 1, // Cusco
        Cod_categoria: 2, // Supongamos que corresponde a "Paisaje Natural"
        Activo: "A",
    },
    {
        id: 3,
        Nombre: "Sacsayhuamán",
        Descripcion: "Fortaleza ceremonial con impresionantes muros de piedra, utilizada por los incas.",
        Longitud: -13.509722,
        PrecioEntrada: 30.0,
        HorarioApertura: "08:00 AM - 05:00 PM",
        Destacado: false,
        Cod_region: 1, // Cusco
        Cod_categoria: 1, // Supongamos que corresponde a "Sitio Histórico"
        Activo: "A",
    },
];

export const lugaresTuristicosChachapoyas: LugareTuristicoType[] = [
    {
        id: 4,
        Nombre: "Fortaleza de Kuélap",
        Descripcion: "Impresionante ciudadela fortificada de la cultura Chachapoyas, conocida como el 'Machu Picchu del norte'.",
        Longitud: -6.420556,
        PrecioEntrada: 30.0,
        HorarioApertura: "08:00 AM - 05:00 PM",
        Destacado: true,
        Cod_region: 2, // Amazonas
        Cod_categoria: 1, // Sitio Histórico
        Activo: "A",
    },
    {
        id: 5,
        Nombre: "Catarata de Gocta",
        Descripcion: "Una de las cascadas más altas del mundo con 771 metros de caída, rodeada de exuberante vegetación.",
        Longitud: -6.021944,
        PrecioEntrada: 10.0,
        HorarioApertura: "Todo el día",
        Destacado: true,
        Cod_region: 2, // Amazonas
        Cod_categoria: 2, // Paisaje Natural
        Activo: "A",
    },
    {
        id: 6,
        Nombre: "Sarcófagos de Karajía",
        Descripcion: "Misteriosos sarcófagos antropomorfos de la cultura Chachapoyas ubicados en lo alto de un acantilado.",
        Longitud: -6.262778,
        PrecioEntrada: 15.0,
        HorarioApertura: "08:00 AM - 04:00 PM",
        Destacado: false,
        Cod_region: 2, // Amazonas
        Cod_categoria: 1, // Sitio Histórico
        Activo: "A",
    },
    {
        id: 7,
        Nombre: "Cavernas de Quiocta",
        Descripcion: "Sistema de cavernas con impresionantes formaciones calcáreas y restos arqueológicos.",
        Longitud: -6.185833,
        PrecioEntrada: 20.0,
        HorarioApertura: "09:00 AM - 03:00 PM",
        Destacado: false,
        Cod_region: 2, // Amazonas
        Cod_categoria: 3, // Aventura
        Activo: "A",
    },
    {
        id: 8,
        Nombre: "Laguna de los Cóndores",
        Descripcion: "Hermosa laguna rodeada de vegetación donde se encontraron importantes mausoleos Chachapoyas.",
        Longitud: -6.845833,
        PrecioEntrada: 25.0,
        HorarioApertura: "Todo el día",
        Destacado: true,
        Cod_region: 2, // Amazonas
        Cod_categoria: 2, // Paisaje Natural
        Activo: "A",
    },
];