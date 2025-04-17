import express from "express";
import { router } from "./routers/usuarioRouter";
import cors from 'cors';
import { routerRegiones } from "./routers/regionesRouter";
import { routerCategoriasLugares } from "./routers/categoriasLugares";
import { routerLugaresTuristicos } from "./routers/lugaresTuristicos";
import { routerInfoLugarTuristico } from "./routers/infoLugarTuristico";
import { routerComentarios } from "./routers/comentariosRouter";

const app = express();

// 1. Configuración básica mejorada
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. CORS configurado correctamente
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204
}));

// 3. Middleware de logging para diagnóstico
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});



// 5. Routers
app.use("/api", router);
app.use("/api", routerRegiones);
app.use("/api", routerCategoriasLugares);
app.use("/api", routerLugaresTuristicos);
app.use("/api", routerInfoLugarTuristico);
app.use("/api", routerComentarios);



// 7. Iniciar servidor con configuración mejorada
const PORT = 3030;
const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
// const server = app.listen(PORT, '0.0.0.0', () => {
//     console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
// });

// 8. Configuración de timeouts (importante para Node.js 22+)
server.keepAliveTimeout = 30000; // 30 segundos
server.headersTimeout = 31000; // 31 segundos