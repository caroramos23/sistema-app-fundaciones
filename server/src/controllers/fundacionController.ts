import { Request, Response } from "express";
import dao from '../dao/fundacionDAO';
import validator from 'validator';
import criptjs, { enc } from 'crypto-js';
import keySecret from "../config/keySecret";

import jwt from 'jsonwebtoken';

class FundacionController {

    /**
     * @description Lista las fundaciones disponibles del usuario logueado
     * @param req 
     * @param res 
     * @returns Promise<Response<any, Record<string, any>> | undefined>
     */
    public async listar(req: Request, res: Response) {
        try {

            // se obtienen el token como parametro
            var { token } = req.params;
            //var decoded = jwt.decode(token);
            var encoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());  //Decodifica el token en string
            console.log("Este es el user:", encoded); //Muestra valores en consola     
            const result = await dao.listar(parseInt(encoded.cveUsuario));//Envia valor de la clave de usuario
 
            res.json(result);
        } catch (error: any) {
            return res.status(500).json({ message : `${error.message}` });
        }
    }

    /**
     *  @description Inserción de fundaciones a la bd
     * @param req 
     * @param res 
     * @returns Promise<Response<any, Record<string, any>> | undefined>
     */
    public async insertar(req: Request, res: Response) {
        try {

            // se obtienen el token como parametro
            var { token } = req.params;
            //var decoded = jwt.decode(token);
            var encoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());  //Decodifica el token en string
            console.log("Este es el user:", encoded); //Muestra valores en consola   
            var cveRegistro = parseInt(encoded.cveUsuario); //Guarda el id de usuario

            // se obtienen los datos del body
            var fundacion = req.body;

            // validar que los datos no sean nulos o indefinidos
            if (!fundacion.nombreFundacion
                || !fundacion.descripcion
                || !fundacion.tipoFundacion
                || !fundacion.fechaFundacion
                || !cveRegistro) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1});
            }

            // se verifica que los datos no se encuentren vacios
            if (validator.isEmpty(fundacion.nombreFundacion.trim())
                || validator.isEmpty(fundacion.descripcion.trim())
                || fundacion.tipoFundacion <= 0
                || validator.isEmpty(fundacion.fechaFundacion.trim())
                || cveRegistro <= 0) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1});
            }
            
            const newFundacion = {
                nombreFundacion: fundacion.nombreFundacion.trim(),
                descripcion: fundacion.descripcion.trim(),
                tipoFundacion: fundacion.tipoFundacion,
                fechaFundacion: fundacion.fechaFundacion.trim(),
                cveRegistro: cveRegistro
            }

            console.log(newFundacion);

            // inserción de los datos
            const result = await dao.insertar(newFundacion);

            if (result.affectedRows > 0) {
                return res.json({message: "Los datos se guardaron correctamente", code: 0});
            } else {
                return res.status(404).json({ message: result.message, code: 1});
            }

        } catch (error: any) {
            return res.status(500).json({ message : `${error.message}` });
        }
    }

    public async actualizar(req: Request, res: Response) {
        try {
            // se obtienen los datos del body
            var fundacion = req.body;

            // validar que los datos no sean nulos o indefinidos
            if (!fundacion.cveFundacion
                || !fundacion.nombreFundacion
                || !fundacion.descripcion
                || !fundacion.tipoFundacion
                || !fundacion.fechaFundacion ) {
                    return res.status(404).json({ message: "Todos los datos son requeridos ", code: 1});
            }

            // se verifica que los datos no se encuentren vacios
            if (fundacion.cveFundacion <= 0
                || validator.isEmpty(fundacion.nombreFundacion.trim())
                || validator.isEmpty(fundacion.descripcion.trim())
                || fundacion.tipoFundacion <= 0
                || validator.isEmpty(fundacion.fechaFundacion.trim())) {
                    return res.status(404).json({ message: "Todos los datos son requeridos 2", code: 1});
            }

            const newFundacion = {
                nombreFundacion: fundacion.nombreFundacion.trim(),
                descripcion: fundacion.descripcion.trim(),
                tipoFundacion: fundacion.tipoFundacion,
                fechaFundacion: fundacion.fechaFundacion.trim()
            }

            // actualización de los datos
            const result = await dao.actualizar(newFundacion, fundacion.cveFundacion);

            if (result.affectedRows > 0) {
                return res.json({message: "Los datos se actualizaron correctamente", code: 0});
            } else {
                return res.status(404).json({ message: result.message, code: 1});
            }

        } catch (error: any) {
            return res.status(500).json({ message : `${error.message}` });
        }
    }

    public async eliminar(req: Request, res: Response) {
        try {
            // se obtienen los datos del body
            var { cveFundacion } = req.params;

            // validar que los datos no sean nulos o indefinidos
            if (!cveFundacion) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1});
            }

            // se verifica que los datos no se encuentren vacios
            if (validator.isEmpty(cveFundacion.trim())) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1});
            }

            // actualización de los datos
            const result = await dao.eliminar(parseInt(cveFundacion));

            if (result.affectedRows > 0) {
                return res.json({message: "Los datos se eliminaron correctamente", code: 0});
            } else {
                return res.status(404).json({ message: result.message, code: 1});
            }

        } catch (error: any) {
            return res.status(500).json({ message : `${error.message}` });
        }
    }

}
export const fundacionController = new FundacionController();