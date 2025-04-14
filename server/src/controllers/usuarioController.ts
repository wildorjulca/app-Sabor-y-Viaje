import { Request, Response } from "express";
import { loginUsuarioService, usuarioGetAllService, usuarioPostService } from "../services/usuarioService";

const addUsuarioCTRL = async (req: Request, res: Response) => {
    try {
        const response = await usuarioPostService(req.body);
        res.status(response.status).send(response);
    } catch (error) {
        console.error("Error in addUsuarioCTRL:", error);
        res.status(500).send({ status: 500, success: false, message: "Internal Server Error" });
    }
};

const getUsuarioCTRL = async (req: Request, res: Response) => {
    try {
        const { name, page, limit } = req.query;
        const response = await usuarioGetAllService(
            String(name ?? ''), // Explicit nullish coalescing
            Number(page ?? 1), 
            Number(limit ?? 10)
        );
        res.status(response.status).send(response);
    } catch (error) {
        console.error("Error in getUsuarioCTRL:", error);
        res.status(500).send({ status: 500, success: false, message: "Internal Server Error" });
    }
}

const loginUsuarioCTRL = async(req: Request, res: Response) => {
    const { email,contrasena} = req.body
    const response = await loginUsuarioService(email,contrasena)
    res.status(response.status).send(response)
};
export {
    addUsuarioCTRL,
    getUsuarioCTRL,
    loginUsuarioCTRL
};
