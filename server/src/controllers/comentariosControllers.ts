import { Request, Response } from "express";
import { newComentarioService } from "../services/comentariosService";



const addComentariosCTRL = async (req: Request, res: Response) => {
    const response = await newComentarioService(req.body)
    res.status(response.status).send(response)
}

export { addComentariosCTRL }