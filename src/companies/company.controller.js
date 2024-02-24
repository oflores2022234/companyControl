import { response, request } from "express";
import Company from './company.model.js';

export const companyPost = async (req, res) => {
    const {nombre, correo, telefono, nacionalidad, nivelImpacto, añosTrayectoria, categoria} = req.body;
    const company = new Company( {nombre, correo, telefono, nacionalidad, nivelImpacto, añosTrayectoria, categoria} );

    await company.save();
    res.status(200).json({
        company
    });
}