import express from 'express'
import { getRegionesCTRL } from '../controllers/regionesController'


const routerRegiones = express.Router()

routerRegiones.get('/getRegiones',getRegionesCTRL)

export { routerRegiones}