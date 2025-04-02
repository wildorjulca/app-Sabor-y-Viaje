import express from 'express'

const routerLugaresTuristicos = express.Router()

routerLugaresTuristicos.get("/getLugaresTuristicos")

export {routerLugaresTuristicos}