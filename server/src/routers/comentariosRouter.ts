import express from 'express'
import { addComentariosCTRL } from '../controllers/comentariosControllers'

const routerComentarios = express.Router()

routerComentarios.post("/addComentarios", addComentariosCTRL)

export { routerComentarios}