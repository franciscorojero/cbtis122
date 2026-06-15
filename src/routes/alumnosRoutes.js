import express from "express";

import {
    crearAlumno,
    obtenerAlumnos
} from "../controllers/alumnosController.js";

const router = express.Router();

router.post("/", crearAlumno);
router.get("/", obtenerAlumnos);

export default router;

/*
{
  "ncontrol": "CONTROL-000003",
  "nombre": "PEPE",
  "correo":"pepe@gmail.com",
  "celular":"6147845478"
}
*/