import { Request, Response } from "express";
import { infolugaresTuristico } from "../services/infoLugarTuristicoService";


const infoLugarTuristicosCTRL = async (req: Request, res: Response) => {
    const idLugarTuristico = req.params.id

    const response = await infolugaresTuristico(parseInt(idLugarTuristico as string))
    if (response.succes && response.data) {
        const lugar = response.data[0] ?? [];   // Primera tabla: Lugares turísticos
        const imagenes = response.data[1] ?? [];  // Segunda tabla: Imágenes
        const comentarios = response.data[2]?? [];

        res.status(response.status).json({
            status: response.status,
            succes: response.succes,
            message: response.message,
            lugar,
            imagenes,
            comentarios
        });
        return
    }
    res.status(response.status).send(response)
}

export { infoLugarTuristicosCTRL }