import { Router } from "express";
import { registroController } from "../controllers/registroController";
import { checkJwt } from "../middlewares/jwt";

class RegistroRoutes {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    private config() {
        // listado
        this.router.get('/registros', registroController.listarRegistros);
    }
}
const registroRoutes = new RegistroRoutes();
export default registroRoutes.router;