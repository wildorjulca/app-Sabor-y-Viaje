import { Request, Response } from "express"
import { lugaresTuristicosGetAllService } from "../services/lugaresTuristicosService"



const getLugaresTuristicosCTRL = async(req:Request, res: Response)=>{
    const id_region = req.params.id
    const response = await lugaresTuristicosGetAllService(parseInt(id_region))
    res.status(response.status).send(response)

}

export { getLugaresTuristicosCTRL}