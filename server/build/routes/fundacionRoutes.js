"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fundacionController_1 = require("../controllers/fundacionController");
class FundacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // listado
        this.router.get('/:token', fundacionController_1.fundacionController.listar);
        // insercion
        this.router.post('/:token', fundacionController_1.fundacionController.insertar);
        // actualizar
        this.router.put('/', fundacionController_1.fundacionController.actualizar);
        // eliminar
        this.router.delete('/:cveFundacion', fundacionController_1.fundacionController.eliminar);
    }
}
const fundacionRoutes = new FundacionRoutes();
exports.default = fundacionRoutes.router;
