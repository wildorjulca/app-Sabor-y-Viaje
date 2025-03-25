import { Request, Response } from "express";
import { usuarioGetAllService, usuarioPostService } from "../services/usuarioService";



const addUsurioCTRL = async (req: Request, res: Response) => {
    const response = await usuarioPostService(req.body)
    res.status(response.status).send(response)
}

const getUsuarioCTRL = async (req: Request, res: Response) => {
    const response = await usuarioGetAllService('wildor')
    res.status(response.status).send(response)
}

export {
    addUsurioCTRL,
    getUsuarioCTRL
}