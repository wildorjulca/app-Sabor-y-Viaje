import express from 'express'
import { addUsurioCTRL, getUsuarioCTRL } from '../controllers/usuarioController'

const router = express.Router()



router.get('/getUsuario', getUsuarioCTRL)
router.post('/postUsuario', addUsurioCTRL)


export { router}