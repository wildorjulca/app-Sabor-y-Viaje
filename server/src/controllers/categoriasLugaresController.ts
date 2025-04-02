import { categoriasLugaresGetAllService } from "../services/categoriasLugares"
import { Request, Response } from "express"

const getCategoriasLugaresCTRL = async (req: Request, res: Response) => {
    const response = await categoriasLugaresGetAllService()
    res.status(response.status).send(response)
}
export { getCategoriasLugaresCTRL }