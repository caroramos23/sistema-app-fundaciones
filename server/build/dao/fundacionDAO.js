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
const database_1 = __importDefault(require("../database/database"));
class FundacionDAO {
    listar(cveUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query("SELECT f.cveFundacion, f.nombreFundacion, f.descripcion, f.tipoFundacion, date_format(f.fechaFundacion, '%Y-%m-%d') as fechaFundacion,  concat_ws(' ', u.nombre, u.apellidos) as registro, u.cveUsuario as cveRegistro " +
                    "FROM tbl_fundacion f " +
                    "JOIN tbl_usuario u on f.cveRegistro = u.cveUsuario " +
                    "WHERE cveRegistro = ?", [cveUsuario]);
            }));
            return result;
        });
    }
    insertar(fundacion) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" INSERT INTO tbl_fundacion SET ? ", [fundacion]);
            }));
            return result;
        });
    }
    actualizar(fundacion, cveFundacion) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" UPDATE tbl_fundacion SET ? WHERE cveFundacion = ? ", [fundacion, cveFundacion]);
            }));
            return result;
        });
    }
    eliminar(cveFundacion) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" DELETE FROM tbl_fundacion WHERE cveFundacion = ? ", [cveFundacion]);
            }));
            return result;
        });
    }
}
const dao = new FundacionDAO();
exports.default = dao;
