import { Request, Response } from "express";
import { usuarioGetAllService } from "../services/usuarioService";



const addUsurioCTRL = (req: Request, res: Response) => {

}

const getUsuarioCTRL = async(req:Request, res:Response)=>{
    const response = await usuarioGetAllService('wildor')
    res.status(response.status).send(response)
}

export {
    addUsurioCTRL,
    getUsuarioCTRL
}