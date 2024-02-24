import { Router } from "express";
import { check } from "express-validator";

import {
    companyPost
} from "./company.controller.js";

import { existenteEmail } from "../helpers/db-validators"; 

import { validarCampos } from "../middlewares/validar-campos";

const router = Router();

router.post(
    "/",
    [
        check("nombre", "The name is obligatory").not().isEmpty(),
        check("correo", "This isn't a email valid").isEmail(),
        check("correo").custom(existenteEmail),
        check("telefono", "The phone is obligatory").not().isEmpty(),
        check("nacionalidad", "The nationality is obligatory").not().isEmpty(),
        check("nivelImpacto", "The level of impact is obligatory").not().isEmpty(),
        check("añosTrayectoria", "The years of trayectory are obligatory").not().isEmpty(),
        check("categoria", "the category is obligatory").not().isEmpty(),
        validarCampos,
    ], companyPost );