import express from "express";
import { infoLugarTuristicosCTRL } from "../controllers/infoLugarTuristicoController";

const routerInfoLugarTuristico = express.Router()

routerInfoLugarTuristico.get("/infoLugarTuristico", infoLugarTuristicosCTRL)


export { routerInfoLugarTuristico}