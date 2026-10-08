import mongoose from "mongoose";

const usuarioSchema= new mongoose.Schema(
    {
        nombre:{
            type:String,
            requiered:true,
        },
        contraseña:{
            type:String,
            requiered:true,
        },
        email: {
            type: String,
            requiered: true,
            unique:true
        },
        fecha_de_creacion:{
            type: Date,
            default: Date.now
        }
        /*
        activo: {
            type:Boolean,
            default:true
        }
        */
       //Por las dudas si hace falta agregarlo
    }
)

const Usuario = mongoose.model('Usuario', usuarioSchema)

export default Usuario