
import express from "express";
import { router } from "./routers/usuarioRouter";
import cors from 'cors'
import { routerRegiones } from "./routers/regionesRouter";
import { routerCategoriasLugares } from "./routers/categoriasLugares";

const app = express()


app.use(cors({
    origin: "*",
}));

app.use(express.json())
app.use("/api", router)
app.use("/api", routerRegiones)
app.use("/api", routerCategoriasLugares)



app.listen(3030,()=> {
    console.log('Servedor en ejecucion PORT:', 3030)
})