import { Request, Response } from "express";
import validator from 'validator';
import criptjs from 'crypto-js';
import keySecret from "../config/keySecret";
import dao from "../dao/tipoDAO";

class TipoController {
    public async listarTipos(req: Request, res: Response) {
        try {

            const result = await dao.listarTipos();

            res.json(result);
        } catch (error: any) {
            return res.status(500).json({ message : `${error.message}` });
        }
    }

}
export const tipoController = new TipoController();