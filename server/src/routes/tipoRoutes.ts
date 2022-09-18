import { Router } from "express";
import { tipoController } from "../controllers/tipoController";
import { checkJwt } from "../middlewares/jwt";

class TipoRoutes {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    private config() {
        // listado
        this.router.get('/tipos', tipoController.listarTipos);
    }
}
const tipoRoutes = new TipoRoutes();
export default tipoRoutes.router;