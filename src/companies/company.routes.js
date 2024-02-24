import { Router } from "express";
import { check } from "express-validator";

import {
    companyPost,
    companyGet,
    companyGetAZ
} from "./company.controller.js";

import { existenteEmailC,
        validarAñosTrayectoria        
} from "../helpers/db-validators.js"; 

import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.get("/", companyGet);

router.post(
    "/",
    [
        check("nombre", "The name is obligatory").not().isEmpty(),
        check("correo", "This isn't a email valid").isEmail(),
        check("correo").custom(existenteEmailC),
        check("telefono", "The phone is obligatory").not().isEmpty(),
        check("nacionalidad", "The nationality is obligatory").not().isEmpty(),
        check("nivelImpacto", "The level of impact is obligatory").not().isEmpty(),
        check("añosTrayectoria", "The years of trayectory are obligatory").not().isEmpty(),
        check("añosTrayectoria").custom(validarAñosTrayectoria),
        check("categoria", "the category is obligatory").not().isEmpty(),
        validarCampos,
    ], companyPost );

    router.get("/", companyGetAZ);

    export default router;

