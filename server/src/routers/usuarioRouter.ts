import express from 'express'
import { loginValidationRules, userValidationRules } from '../models/validaciones/userValidation'
import { validate } from '../middleware/validator'
import { addUsuarioCTRL, getUsuarioCTRL, loginUsuarioCTRL } from '../controllers/usuarioController'

const router = express.Router()

router.get('/getUsuario', getUsuarioCTRL)
router.post('/postUsuario', userValidationRules, validate, addUsuarioCTRL)

router.post('/loginUsuario', loginValidationRules, validate, loginUsuarioCTRL)
export { router }