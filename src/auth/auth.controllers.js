import bcryptjs from 'bcryptjs';
import Usuario from '../users/user.model.js'
import { generarJWT } from '../helpers/generate-jwt.js'; 

export const login = async (req, res) => {
    const {correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
          return res.status(400).json({
            msg: "Incorrect credentials, Email doesn't exist in the DB",
          });
        }
        if (!usuario.estado) {
          return res.status(400).json({
            msg: "User doesn't exist in the DB",
          });
        }
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
          return res.status(400).json({
            msg: "Password is incorrect",
          });
        }
        const token = await generarJWT( usuario.id);
    
        res.status(200).json({
          msg: 'Login Ok!!!',
          usuario,
          token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Contact with the administrator",
        });
    }
}