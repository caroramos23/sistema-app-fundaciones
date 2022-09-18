import { Router } from "express";
import { fundacionController } from "../controllers/fundacionController";
import { checkJwt } from "../middlewares/jwt";

class FundacionRoutes {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    private config() {
        // listado
        this.router.get('/:token', fundacionController.listar);
        // insercion
        this.router.post('/:token', fundacionController.insertar);
        // actualizar
        this.router.put('/', fundacionController.actualizar);
        // eliminar
        this.router.delete('/:cveFundacion', fundacionController.eliminar);
    }
}
const fundacionRoutes = new FundacionRoutes();
export default fundacionRoutes.router;