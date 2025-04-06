import express from 'express'
import { getLugaresTuristicosCTRL } from '../controllers/lugaresTuristicos'

const routerLugaresTuristicos = express.Router()

routerLugaresTuristicos.get("/getLugaresTuristicos/:id",getLugaresTuristicosCTRL)

export {routerLugaresTuristicos}
