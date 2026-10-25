import mongoose from "mongoose";
import { NOMBRE_COLECCION_USUARIO } from "./user.model";

const mensajeDirectoSchema = new mongoose.Schema(
    {
        contenido:{
            type:String
        },
        id_usuario_emisor:{
            type: mongoose.Schema.Types.ObjectId,
            requiered: true,
            ref: NOMBRE_COLECCION_USUARIO
        },
        id_usuario_receptor:{
            type: mongoose.Schema.Types.ObjectId,
            requiered: true,
            ref: NOMBRE_COLECCION_USUARIO
        },
        fecha_creacion:{
            type:Date,
            default: Date.now
        }
    }
)

export const NOMBRE_COLECCION_MENSAJE_DIRECTO = ('Mensaje_directo')

const Mensaje_directo = mongoose.model(NOMBRE_COLECCION_MENSAJE_DIRECTO,mensajeDirectoSchema)

export default Mensaje_directo