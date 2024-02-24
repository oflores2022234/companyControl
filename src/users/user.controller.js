import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';


export const usuariosPost = async (req, res) => {


    const {nombre, correo, password} = req.body;
    const usuario = new User( {nombre, correo, password} );

    const salt = bcryptjs.genSaltSync(); 
    usuario.password = bcryptjs.hashSync(password, salt);


    await usuario.save();

    res.status(200).json({
        usuario
    });
}

export const usuariosGet = async (req = request, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
}

export const getUsuarioById = async (req, res) => {
    const {id} = req.params;
    const usuario = await User.find({_id: id});

    res.status(200).json({
        usuario
    })
}

