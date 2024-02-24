import { Router } from "express";
import { check } from "express-validator";
import {

  usuariosPost,
  usuariosGet,
  getUsuarioById,
  usuariosPut

} from "./user.controller.js";
import {
  existenteEmail,
  existeUsuarioById,
} from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.get("/", usuariosGet);


router.post(
  "/",
  [
    check("nombre", "The name is obligatory").not().isEmpty(),
    check("password", "Password must be longer than 6 characters").isLength({
      min: 6,
    }),
    check("correo", "This is not a valid email").isEmail(),
    check("correo").custom(existenteEmail),
    validarCampos,
  ],
  usuariosPost
);

router.get(
  "/:id",
  [
    check("id", "Is not a ID valid").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ], getUsuarioById);

  router.put(
    "/:id",
    [
      check("id", "Is not a ID valid").isMongoId(),
      check("id").custom(existeUsuarioById),
      validarCampos,
    ], usuariosPut );



export default router;
