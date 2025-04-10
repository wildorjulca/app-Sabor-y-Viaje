import express from 'express'
import { addUsurioCTRL, getUsuarioCTRL, loginUsuarioCTRL } from '../controllers/usuarioController'
import { loginValidationRules, userValidationRules } from '../models/validaciones/userValidation'
import { validate } from '../middleware/validator'

const router = express.Router()

router.get('/getUsuario', getUsuarioCTRL)
router.post('/postUsuario', userValidationRules, validate, addUsurioCTRL)

router.post('/loginUsuario', loginValidationRules, validate, loginUsuarioCTRL)

export { router }