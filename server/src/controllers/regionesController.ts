import { Request, Response } from "express"
import {regionesGetAllService} from '../services/regionesService'

const getRegionesCTRL = async(req:Request,res:Response)=>{
    const response = await regionesGetAllService()
    res.status(response.status).send(response)
}

export { getRegionesCTRL}