"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const registroRoutes_1 = __importDefault(require("./routes/registroRoutes"));
const fundacionRoutes_1 = __importDefault(require("./routes/fundacionRoutes"));
const tipoRoutes_1 = __importDefault(require("./routes/tipoRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        // configuración del puerto para el servidor
        this.app.set("port", 3000);
        // muestra las peticiones en consola
        this.app.use((0, morgan_1.default)("dev"));
        // puertos de conexión de la API
        this.app.use((0, cors_1.default)());
        // solo se pertimen peticiones en formato JSON
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use("/api/auth", authRoutes_1.default);
        this.app.use("/api/users", usuarioRoutes_1.default);
        this.app.use("/api/registros", registroRoutes_1.default);
        this.app.use("/api/fundaciones", fundacionRoutes_1.default);
        this.app.use("/api/fundaciones_tipos", tipoRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
