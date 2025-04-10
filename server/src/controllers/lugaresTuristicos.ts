import { Request, Response } from "express"
import { lugaresByCatService, lugaresTuristicosGetAllService } from "../services/lugaresTuristicosService"



const getLugaresTuristicosCTRL = async(req:Request, res: Response)=>{
    const id_region = req.params.id
    const response = await lugaresTuristicosGetAllService(parseInt(id_region))
    res.status(response.status).send(response)

}

const getLugaresTuristicosCategoriaCTRL = async(req:Request, res: Response)=>{
    const {idRegion,codCategoria,} = req.query
    const response = await lugaresByCatService(parseInt(idRegion as string),parseInt(codCategoria as string))
    res.status(response.status).send(response)
}

export { getLugaresTuristicosCTRL,getLugaresTuristicosCategoriaCTRL}