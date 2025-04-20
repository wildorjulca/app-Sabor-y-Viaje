import express from 'express'
import { addComentariosCTRL } from '../controllers/comentariosControllers'


import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const routerComentarios = express.Router()

routerComentarios.post("/addComentarios",upload.single('image'), addComentariosCTRL)

export { routerComentarios}