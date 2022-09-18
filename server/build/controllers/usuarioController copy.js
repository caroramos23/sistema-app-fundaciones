"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const usuarioDAO_1 = __importDefault(require("../dao/usuarioDAO"));
const validator_1 = __importDefault(require("validator"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const keySecret_1 = __importDefault(require("../config/keySecret"));
class UsuarioController {
    /**
     * @description Lista los usuarios disponibles
     * @param req
     * @param res
     * @returns Promise<Response<any, Record<string, any>> | undefined>
     */
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield usuarioDAO_1.default.listar();
                res.json(result);
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    /**
     *  @description Inserción de usuarios a la bd
     * @param req
     * @param res
     * @returns Promise<Response<any, Record<string, any>> | undefined>
     */
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // se obtienen los datos del body
                var usuario = req.body;
                // validar que los datos no sean nulos o indefinidos
                if (!usuario.nombre
                    || !usuario.apellidos
                    || !usuario.username
                    || !usuario.password) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
                }
                // se verifica que los datos no se encuentren vacios
                if (validator_1.default.isEmpty(usuario.nombre.trim())
                    || validator_1.default.isEmpty(usuario.apellidos.trim())
                    || validator_1.default.isEmpty(usuario.username.trim())
                    || validator_1.default.isEmpty(usuario.password.trim())) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
                }
                // encriptar nuestra contraseña
                var encryptedText = crypto_js_1.default.AES.encrypt(usuario.password, keySecret_1.default.keys.secret).toString();
                usuario.password = encryptedText;
                const newUser = {
                    nombre: usuario.nombre.trim(),
                    apellidos: usuario.apellidos.trim(),
                    username: usuario.username.trim(),
                    password: usuario.password.trim()
                };
                console.log(newUser);
                // inserción de los datos
                const result = yield usuarioDAO_1.default.insertar(newUser);
                if (result.affectedRows > 0) {
                    return res.json({ message: "Los datos se guardaron correctamente", code: 0 });
                }
                else {
                    return res.status(404).json({ message: result.message, code: 1 });
                }
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // se obtienen los datos del body
                var usuario = req.body;
                // validar que los datos no sean nulos o indefinidos
                if (!usuario.cveUsuario
                    || !usuario.nombre
                    || !usuario.apellidos) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
                }
                // se verifica que los datos no se encuentren vacios
                if (usuario.cveUsuario <= 0
                    || validator_1.default.isEmpty(usuario.nombre.trim())
                    || validator_1.default.isEmpty(usuario.apellidos.trim())) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
                }
                const newUser = {
                    nombre: usuario.nombre.trim(),
                    apellidos: usuario.apellidos.trim()
                };
                // actualización de los datos
                const result = yield usuarioDAO_1.default.actualizar(newUser, usuario.cveUsuario);
                if (result.affectedRows > 0) {
                    return res.json({ message: "Los datos se actualizaron correctamente", code: 0 });
                }
                else {
                    return res.status(404).json({ message: result.message, code: 1 });
                }
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // se obtienen los datos del body
                var { cveUsuario } = req.params;
                // validar que los datos no sean nulos o indefinidos
                if (!cveUsuario) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
                }
                // se verifica que los datos no se encuentren vacios
                if (validator_1.default.isEmpty(cveUsuario.trim())) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
                }
                // actualización de los datos
                const result = yield usuarioDAO_1.default.eliminar(parseInt(cveUsuario));
                if (result.affectedRows > 0) {
                    return res.json({ message: "Los datos se eliminaron correctamente", code: 0 });
                }
                else {
                    return res.status(404).json({ message: result.message, code: 1 });
                }
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
