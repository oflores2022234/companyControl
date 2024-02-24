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

export const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const {_id, password, correo, ...resto} = req.body;


    await User.findByIdAndUpdate(id, resto);

    const usuario = await User.findOne({_id: id});

    res.status(200).json({
        msg: 'Usuario Actualizado',
        usuario
    });
}

export const usuariosDelete = async (req, res) => {
    const {id} = req.params;

    const usuario = await User.findByIdAndUpdate(id, { estado: false});
    const usuarioAutenticado = req.usuario;

    res.status(200).json({msg:'Usuario a eliminar', usuario, usuarioAutenticado });
}