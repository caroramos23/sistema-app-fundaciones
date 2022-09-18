"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoController_1 = require("../controllers/tipoController");
class TipoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // listado
        this.router.get('/tipos', tipoController_1.tipoController.listarTipos);
    }
}
const tipoRoutes = new TipoRoutes();
exports.default = tipoRoutes.router;
