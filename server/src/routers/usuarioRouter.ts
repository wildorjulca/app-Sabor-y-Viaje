import express from 'express'
import { getUsuarioCTRL } from '../controllers/usuarioController'

const router = express.Router()



router.get('/getUsuario', getUsuarioCTRL)


export { router}