import { Request, Response } from "express";
import { usuarioGetAllService, usuarioPostService } from "../services/usuarioService";



const addUsurioCTRL = async (req: Request, res: Response) => {
    const response = await usuarioPostService(req.body)
    res.status(response.status).send(response)
}

const getUsuarioCTRL = async (req: Request, res: Response) => {
    const {name,page,limit} = req.query
    const response = await usuarioGetAllService(String(name) || '', Number(page) || 1, Number(limit) || 10 )
    res.status(response.status).send(response)
}

export {
    addUsurioCTRL,
    getUsuarioCTRL
}