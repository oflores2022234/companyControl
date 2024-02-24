import { Router } from "express";
import { check } from "express-validator";


import { validarCampos } from "../middlewares/validar-campos.js";
import { login  } from "./auth.controllers.js";

const router = Router()

router.post(
    '/login',
    [
        check('correo', 'This is not a valid email').isEmail(),
        check('password', 'The password is obligatory').not().isEmpty(),
        validarCampos,
    ], 
        login)

export default router