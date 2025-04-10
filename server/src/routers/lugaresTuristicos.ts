import express from 'express'
import { getLugaresTuristicosCategoriaCTRL, getLugaresTuristicosCTRL } from '../controllers/lugaresTuristicos'

const routerLugaresTuristicos = express.Router()

routerLugaresTuristicos.get("/getLugaresTuristicos/:id",getLugaresTuristicosCTRL)
routerLugaresTuristicos.get("/getLugaresTuristicosCategoria",getLugaresTuristicosCategoriaCTRL)


export {routerLugaresTuristicos}
