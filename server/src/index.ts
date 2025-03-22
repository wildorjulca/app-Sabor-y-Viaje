
import express from "express";
import { router } from "./routers/usuarioRouter";

const app = express()


app.use(express.json())
app.use("/api", router)

app.listen(3030,()=> {
    console.log('Servedor en ejecucion PORT:', 3030)
})