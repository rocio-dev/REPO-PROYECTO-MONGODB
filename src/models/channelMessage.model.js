import mongoose from "mongoose";
import {NOMBRE_COLECCION_MIEMBRO} from './member.model'
import { NOMBRE_COLECCION_CANAL } from "./channel.model";
const mensajeCanalSchema = new mongoose.Schema(
    {
        contenido:{
            type:String
        },
        id_miembro:{
            type: mongoose.Schema.Types.ObjectId,
            requiered: true,
            ref: NOMBRE_COLECCION_MIEMBRO
        },
        id_canal:{
            type: mongoose.Schema.Types.ObjectId,
            requiered: true,
            ref: NOMBRE_COLECCION_CANAL
        },
        fecha_creacion:{
            type: Date,
            default: Date.now
        }
    }
)

export const NOMBRE_COLECCION_MENSAJE_CANAL = ('Mensaje_canal')

const Mensaje_canal = mongoose.model(NOMBRE_COLECCION_MENSAJE_CANAL,mensajeCanalSchema)

export default Mensaje_canal