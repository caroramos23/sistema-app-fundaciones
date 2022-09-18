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
exports.fundacionController = void 0;
const fundacionDAO_1 = __importDefault(require("../dao/fundacionDAO"));
const validator_1 = __importDefault(require("validator"));
class FundacionController {
    /**
     * @description Lista los usuarios disponibles
     * @param req
     * @param res
     * @returns Promise<Response<any, Record<string, any>> | undefined>
     */
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // se obtienen el token como parametro
                var { token } = req.params;
                //var decoded = jwt.decode(token);
                var encoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()); //Decodifica el token en string
                console.log("Este es el user:", encoded); //Muestra valores en consola     
                const result = yield fundacionDAO_1.default.listar(parseInt(encoded.cveUsuario)); //Envia valor de la clave de usuario
                res.json(result);
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    /**
     *  @description Inserción de fundaciones a la bd
     * @param req
     * @param res
     * @returns Promise<Response<any, Record<string, any>> | undefined>
     */
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // se obtienen el token como parametro
                var { token } = req.params;
                //var decoded = jwt.decode(token);
                var encoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()); //Decodifica el token en string
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
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
                }
                // se verifica que los datos no se encuentren vacios
                if (validator_1.default.isEmpty(fundacion.nombreFundacion.trim())
                    || validator_1.default.isEmpty(fundacion.descripcion.trim())
                    || fundacion.tipoFundacion <= 0
                    || validator_1.default.isEmpty(fundacion.fechaFundacion.trim())
                    || cveRegistro <= 0) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
                }
                const newFundacion = {
                    nombreFundacion: fundacion.nombreFundacion.trim(),
                    descripcion: fundacion.descripcion.trim(),
                    tipoFundacion: fundacion.tipoFundacion,
                    fechaFundacion: fundacion.fechaFundacion.trim(),
                    cveRegistro: cveRegistro
                };
                console.log(newFundacion);
                // inserción de los datos
                const result = yield fundacionDAO_1.default.insertar(newFundacion);
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
                var fundacion = req.body;
                // validar que los datos no sean nulos o indefinidos
                if (!fundacion.cveFundacion
                    || !fundacion.nombreFundacion
                    || !fundacion.descripcion
                    || !fundacion.tipoFundacion
                    || !fundacion.fechaFundacion) {
                    return res.status(404).json({ message: "Todos los datos son requeridos ", code: 1 });
                }
                // se verifica que los datos no se encuentren vacios
                if (fundacion.cveFundacion <= 0
                    || validator_1.default.isEmpty(fundacion.nombreFundacion.trim())
                    || validator_1.default.isEmpty(fundacion.descripcion.trim())
                    || fundacion.tipoFundacion <= 0
                    || validator_1.default.isEmpty(fundacion.fechaFundacion.trim())) {
                    return res.status(404).json({ message: "Todos los datos son requeridos 2", code: 1 });
                }
                const newFundacion = {
                    nombreFundacion: fundacion.nombreFundacion.trim(),
                    descripcion: fundacion.descripcion.trim(),
                    tipoFundacion: fundacion.tipoFundacion,
                    fechaFundacion: fundacion.fechaFundacion.trim()
                };
                // actualización de los datos
                const result = yield fundacionDAO_1.default.actualizar(newFundacion, fundacion.cveFundacion);
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
                var { cveFundacion } = req.params;
                // validar que los datos no sean nulos o indefinidos
                if (!cveFundacion) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
                }
                // se verifica que los datos no se encuentren vacios
                if (validator_1.default.isEmpty(cveFundacion.trim())) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
                }
                // actualización de los datos
                const result = yield fundacionDAO_1.default.eliminar(parseInt(cveFundacion));
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
exports.fundacionController = new FundacionController();
