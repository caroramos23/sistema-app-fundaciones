import { Request, Response } from "express";
import dao from '../dao/usuarioDAO';
import validator from 'validator';
import criptjs from 'crypto-js';
import keySecret from "../config/keySecret";

class UsuarioController {

    /**
     * @description Lista los usuarios disponibles
     * @param req 
     * @param res 
     * @returns Promise<Response<any, Record<string, any>> | undefined>
     */
    public async listar(req: Request, res: Response) {
        try {

            const result = await dao.listar();

            res.json(result);
        } catch (error: any) {
            return res.status(500).json({ message : `${error.message}` });
        }
    }

    /**
     *  @description Inserción de usuarios a la bd
     * @param req 
     * @param res 
     * @returns Promise<Response<any, Record<string, any>> | undefined>
     */
    public async insertar(req: Request, res: Response) {
        try {
            // se obtienen los datos del body
            var usuario = req.body;

            // validar que los datos no sean nulos o indefinidos
            if (!usuario.nombre
                || !usuario.apellidos
                || !usuario.username
                || !usuario.password) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1});
            }

            // se verifica que los datos no se encuentren vacios
            if (validator.isEmpty(usuario.nombre.trim())
                || validator.isEmpty(usuario.apellidos.trim())
                || validator.isEmpty(usuario.username.trim())
                || validator.isEmpty(usuario.password.trim())) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1});
            }

            //Valida que el usuario no exista
            const existeUser = await dao.consultaExiste(usuario.username);
            console.log(existeUser);
            if(existeUser.length >= 1){
                return res.status(404).json({ message: "El username ya existe, elija otro", code: 1});
            } else {

                // encriptar nuestra contraseña
                var encryptedText = criptjs.AES.encrypt(usuario.password, keySecret.keys.secret).toString();
                usuario.password = encryptedText;

                
                const newUser = {
                    nombre: usuario.nombre.trim(),
                    apellidos: usuario.apellidos.trim(),
                    username: usuario.username.trim(),
                    password: usuario.password.trim()
                }

                console.log(newUser);

                // inserción de los datos
                const result = await dao.insertar(newUser);

                if (result.affectedRows > 0) {
                    return res.json({message: "Los datos se guardaron correctamente", code: 0});
                } else {
                    return res.status(404).json({ message: result.message, code: 1});
                }
            }

        } catch (error: any) {
            return res.status(500).json({ message : `${error.message}` });
        }
    }

    public async actualizar(req: Request, res: Response) {
        try {
            // se obtienen los datos del body
            var usuario = req.body;

            // validar que los datos no sean nulos o indefinidos
            if (!usuario.cveUsuario
                || !usuario.nombre
                || !usuario.apellidos) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1});
            }

            // se verifica que los datos no se encuentren vacios
            if (usuario.cveUsuario <= 0
                || validator.isEmpty(usuario.nombre.trim())
                || validator.isEmpty(usuario.apellidos.trim())) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1});
            }

            const newUser = {
                nombre: usuario.nombre.trim(),
                apellidos: usuario.apellidos.trim()
            }

            // actualización de los datos
            const result = await dao.actualizar(newUser, usuario.cveUsuario);

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
            var { cveUsuario } = req.params;

            // validar que los datos no sean nulos o indefinidos
            if (!cveUsuario) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1});
            }

            // se verifica que los datos no se encuentren vacios
            if (validator.isEmpty(cveUsuario.trim())) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1});
            }

            // actualización de los datos
            const result = await dao.eliminar(parseInt(cveUsuario));

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
export const usuarioController = new UsuarioController();