import express from 'express'
import { addUsurioCTRL, getUsuarioCTRL } from '../controllers/usuarioController'
import { userValidationRules } from '../models/validaciones/userValidation'
import { validate } from '../middleware/validator'

const router = express.Router()

router.get('/getUsuario', getUsuarioCTRL)
router.post('/postUsuario', userValidationRules, validate, addUsurioCTRL)


export { router }