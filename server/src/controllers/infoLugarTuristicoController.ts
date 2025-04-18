import { Request, Response } from "express";
import { infolugaresTuristico } from "../services/infoLugarTuristicoService";

const infoLugarTuristicosCTRL = async (req: Request, res: Response) => {
    const idLugarTuristico = req.params.id;

    const response = await infolugaresTuristico(parseInt(idLugarTuristico as string));
    if (response.succes && response.data) {
        const lugar = response.data[0] ?? []; // Primera tabla: Lugares turísticos
        const imagenes = response.data[1] ?? []; // Segunda tabla: Imágenes
        let comentarios = response.data[2] ?? []; // Tercera tabla: Comentarios


        // Convertir `FotosComentarios` de JSON string a array de objetos
        comentarios = comentarios.map((comentario: any) => {
            if (comentario.FotosComentarios) {
                try {
                    comentario.FotosComentarios = JSON.parse(comentario.FotosComentarios);
                } catch (error) {
                    comentario.FotosComentarios = []; // Si hay un error, asignar un array vacío
                }
            } else {
                comentario.FotosComentarios = []; // Si no hay FotosComentarios, asignar un array vacío
            }
            return comentario;
        });

        res.status(response.status).json({
            status: response.status,
            succes: response.succes,
            message: response.message,
            lugar,
            imagenes,
            comentarios,
        });
        return;
    }
    res.status(response.status).send(response);
};

export { infoLugarTuristicosCTRL };
