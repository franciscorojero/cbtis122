import express from "express";

import {
    registrarAcceso,
    obtenerRegistros
} from "../controllers/registrosController.js";

const router = express.Router();

router.post("/", registrarAcceso);
router.get("/", obtenerRegistros);

export default router;