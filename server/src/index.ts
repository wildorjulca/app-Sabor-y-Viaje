
import express from "express";
import { router } from "./routers/usuarioRouter";
import cors from 'cors'

const app = express()


app.use(cors({
    origin: "*",
}));

app.use(express.json())
app.use("/api", router)

app.listen(3030,()=> {
    console.log('Servedor en ejecucion PORT:', 3030)
})