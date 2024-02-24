import mongoose from "mongoose";

const CompanySchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "The name is obligatory"],
    },
    correo: {
        type: String,
        required: [true, "The email is obligatory"],
    },
    telefono: {
        type: String,
        required: [true, "The phone is obligatory"],
    },
    nacionalidad: {

    },
    nivelImpacto: {
        type: String,
        required: [true, "The level of impact is obligatory "],
    },
    añosTrayectoria: {
        type: Number,
        required: [true, "The years of trayectory are obligatory"],
    },
    categoria: {
        type: String,
        required: [true, "The category is obligatory"],
    },
    estado:{
        type: Boolean,
        default: true,
    },
});

CompanySchema.methods.json = function(){
    const { __v, _id, ...company} = this.toObject();
    company.uid = _id;
    return company;
}

export default mongoose.model('Company', CompanySchema);