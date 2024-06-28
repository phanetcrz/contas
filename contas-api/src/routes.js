import { Router } from "express";
import controllerConta from "./controllers/controller.conta.js";
import controllerCategoria from "./controllers/controller.categoria.js";

const router = Router();

router.get("/categorias", controllerCategoria.Listar);
router.post("/categorias", controllerCategoria.Inserir);

router.get("/contas", controllerConta.Listar);

router.get("/contas/:id", controllerConta.ListarId);
router.post("/contas", controllerConta.Inserir);
router.put("/contas/:id", controllerConta.Editar);
router.delete("/contas/:id", controllerConta.Deletar);


export default router;