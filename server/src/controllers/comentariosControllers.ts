import { Request, Response } from "express";
import { newComentarioService } from "../services/comentariosService";
import * as fs from 'fs';
import * as path from 'path';
import { uploadImage } from "../libs/cloudinaryService";
import { createImage } from "../services/images";

const addComentariosCTRL = async (req: Request, res: Response) => {
    const { cod_usuario } = req.body

    if (req.file) {
        const filePath = path.join(__dirname, '../../uploads', req.file.filename);
        // Eliminar el archivo temporal
        const response = await newComentarioService(req.body)
        if (response.status === 200) {
            // Subir a Cloudinary
            const cloudinaryResult = await uploadImage(filePath);

            const imageRecord = await createImage({
                Cod_comentario: response.data,
                Cod_usuario: cod_usuario,
                URLImagen: cloudinaryResult.secure_url
            })
        }
        fs.unlinkSync(filePath);
        res.status(response.status).send(response)
    } else {
        const response = await newComentarioService(req.body)
        res.status(response.status).send(response)
    }

}

export { addComentariosCTRL }