import { Request, Response } from "express"
import { lugaresTuristicosGetAllService } from "../services/lugaresTuristicosService"



const getRegionesCTRL = async(req:Request, res: Response)=>{
    const response = await lugaresTuristicosGetAllService()

}

export { getRegionesCTRL}