import User from '../users/user.model.js'
import Company from '../companies/company.model.js'


export const existenteEmail = async (correo = '') => {
    const existeEmail = await User.findOne({correo});
    if (existeEmail){
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

export const existenteEmailC = async (correo = '') => {
    const existeEmail = await Company.findOne({correo});
    if (existeEmail){
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario){
        throw new Error(`El ID: ${correo} No existe`);
    }
}

export const validarAñosTrayectoria = async (años = "") => {

    if (años === null || isNaN(años) || años < 0) {
        throw new Error('The years of trayectory must be a valid number greater than 0');
    }

    if (!Number.isInteger(años)){
        throw new Error('The years of trayectory must be a whole number');
    }

    if(años < 0) {
        throw new Error('The years of trayectory cannot be negative');
    }

}