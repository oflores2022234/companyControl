import { response, request } from "express";
import Company from './company.model.js';
import ExcelJS from 'exceljs';

export const companyPost = async (req, res) => {
    const {nombre, correo, telefono, nacionalidad, nivelImpacto, añosTrayectoria, categoria} = req.body;
    const company = new Company( {nombre, correo, telefono, nacionalidad, nivelImpacto, añosTrayectoria, categoria} );

    await company.save();
    res.status(200).json({
        company
    });
}

export const companyGet = async (req = request, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, companies] = await Promise.all([
        Company.countDocuments(query),
        Company.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        companies
    });
}

export const companyGetAZ = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    try {
        const [total, companies] = await Promise.all([
            Company.countDocuments(query),
            Company.find(query)
                .sort({ nombre: 1 }) //para ordendar alfabeticamente (1 a-z, -1 z-a)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            companies
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error to list Companies'
        });
    }
};

//--------------------------------------------------------------------------------

export const companyGetZA = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    try {
        const [total, companies] = await Promise.all([
            Company.countDocuments(query),
            Company.find(query)
                .sort({ nombre: -1 }) 
                .skip(Number(desde))
                .limit(Number(limite))
                
        ]);

        res.status(200).json({
            total,
            companies
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error to list Companies'
        });
    }
};

export const companyYearsTrayectory = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    try {
        const [total, companies] = await Promise.all([
            Company.countDocuments(query),
            Company.find(query)
                .sort({ añosTrayectoria: -1 }) 
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            companies
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error to list Companies'
        });
    }
};

export const companyGetCategory = async (req = request, res = response) => {
    const { limite, desde, categoria } = req.query; 
    const query = { estado: true };

    if (categoria) {
        query.categoria = categoria;
    }

    try {
        const [total, companies] = await Promise.all([
            Company.countDocuments(query),
            Company.find(query)
                .sort({ nombre: -1 }) 
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            companies
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error to get comànies'
        });
    }
};

export const companiesPut = async (req, res = response) =>{
    const { id } = req.params;
    const {_id, ...resto} = req.body;

    await Company.findByIdAndUpdate(id, resto);

    const company = await Company.findOne({_id: id});

    res.status(200).json({
        msg: 'User Update!!',
        company
    });

}

//investigado y entendido   

export const generateExcelReport = async (req, res) => {
    try {
        // Obtiene los datos de todas las empresas
        const companies = await Company.find({}).exec();

        // Crea un nuevo libro de Excel
        const workbook = new ExcelJS.Workbook();

        // Agrega una hoja al libro 

        //se encarga de agregar la hoja al libro de excel
        const worksheet = workbook.addWorksheet('Companies');

        //Aquí agregamos los encabezados para cada uno de los datos de la empresa
        worksheet.addRow(['Company Name', 'Company Email', 'Company Phone', 'Nationality', 'Level Of Impact', 'Years of Trayectory', 'Category']);

        // por mediod el for each, recorre por la coleccion para jalar los datos
        companies.forEach(company => {
            worksheet.addRow([
                company.nombre,
                company.correo,
                company.telefono,
                company.nacionalidad,
                company.nivelImpacto,
                company.añosTrayectoria,
                company.categoria
            ]);
        });

        // Genera un buffer de Excel
        const buffer = await workbook.xlsx.writeBuffer();

        // Envía el archivo Excel como respuesta
        //nos indica y también a vs code que es un archivo de tipo excel
        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        //esta hace que como por el archivo es de tipo "binario" nos de la opciòn de descargarlo en nuestra pc, abre la ventana de desacarga con el nombre de reporte_empresas de
        //formato excel
        res.set('Content-Disposition', 'attachment; filename="reporte_empresas.xlsx"');
        //buffer encargado de almacenar una cantidad de bytes de forma temporal, da la oprtunidad de leer y modificarlos.
        res.send(buffer);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Report no generated",
        });
    }
};


