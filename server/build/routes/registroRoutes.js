"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registroController_1 = require("../controllers/registroController");
class RegistroRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // listado
        this.router.get('/registros', registroController_1.registroController.listarRegistros);
    }
}
const registroRoutes = new RegistroRoutes();
exports.default = registroRoutes.router;
