import { body } from "express-validator";

export const userValidationRules = [
  // Validación para el nombre
  body('name')
    .trim().bail() // Elimina espacios en blanco al inicio y final
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres')
  ,

  // Validación para el email
  body('email')
    .trim().bail()
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Ingresa un email válido').bail()
    .isLength({ max: 100 }).withMessage('El email no puede exceder 100 caracteres')
    .normalizeEmail(), // Normaliza el email (minúsculas, etc.)

  // Validación para la contraseña
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria').bail()
    .isLength({ min: 5, max: 255 }).withMessage('La contraseña debe tener entre 5 y 255 caracteres'),
  // .matches(/[A-Z]/).withMessage('Debe contener al menos una mayúscula')
  // .matches(/[a-z]/).withMessage('Debe contener al menos una minúscula')
  // .matches(/[0-9]/).withMessage('Debe contener al menos un número')
  // .matches(/[^A-Za-z0-9]/).withMessage('Debe contener al menos un carácter especial'),

  // Validación opcional para la foto de perfil (URL)
  // body('profilePicture')
  //   .optional()
  //   .isURL().withMessage('Ingresa una URL válida para la foto').bail()
  //   .isLength({ max: 255 }).withMessage('La URL no puede exceder 255 caracteres'),

  // Validación para el rol (si es necesario)
  //   body('role')
  //     .optional()
  //     .isIn(['admin', 'user']).withMessage('Rol no válido')
];


export const loginValidationRules = [
  body('email')
    .trim().bail()
    .not().isEmpty().withMessage('El email es obligatorio').bail(),
  body("contrasena")
    .not().isEmpty().withMessage('La contraseña es obligatoria').bail()
]