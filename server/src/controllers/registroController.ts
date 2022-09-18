import { Request, Response } from "express";
import validator from 'validator';
import criptjs from 'crypto-js';
import keySecret from "../config/keySecret";
import dao from "../dao/registroDAO";

class RegistroController {

    /**
     * @description Lista los "registradores" (usuarios) disponibles
     * @param req 
     * @param res 
     * @returns Promise<Response<any, Record<string, any>> | undefined>
     */
    public async listarRegistros(req: Request, res: Response) {
        try {

            const result = await dao.listarRegistros();

            res.json(result);
        } catch (error: any) {
            return res.status(500).json({ message : `${error.message}` });
        }
    }

}
export const registroController = new RegistroController();