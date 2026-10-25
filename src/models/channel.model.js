import mongoose from "mongoose";
import { NOMBRE_COLECCION_ESPACIO_TRABAJO } from "./workspace.model";

const canalSchema = new mongoose.Schema(
    {
        nombre:{
            type: String,
            requiered: true
        },
        descripcion:{
            type:String
        },
        id_espacio_trabajo:{
            type: mongoose.Schema.Types.ObjectId,
            requiered: true,
            ref:NOMBRE_COLECCION_ESPACIO_TRABAJO
        },
        fecha_creacion:{
            type: Date,
            default: Date.now
        }
    }
)

export const NOMBRE_COLECCION_CANAL = ('Canal')

const Canal = mongoose.model(NOMBRE_COLECCION_CANAL,canalSchema)

export default Canal