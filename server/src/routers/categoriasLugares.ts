import express from 'express'
import { getCategoriasLugaresCTRL } from '../controllers/categoriasLugaresController'

const routerCategoriasLugares = express.Router()


routerCategoriasLugares.get('/getCategoriasLugares',getCategoriasLugaresCTRL )

export {routerCategoriasLugares}