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
        },
        
        activo: {
            type:Boolean,
            default:true
        }
        
       //Por las dudas si hace falta agregarlo
    }
)
export const NOMBRE_COLECCION_USUARIO= ('Usuario')

const Usuario = mongoose.model(NOMBRE_COLECCION_USUARIO, usuarioSchema)

export default Usuario