import mongoose from "mongoose";
import {NOMBRE_COLECCION_USUARIO} from "./user.model.js"
import { NOMBRE_COLECCION_ESPACIO_TRABAJO } from "./workspace.model.js";

const miembroSchema = new mongoose.Schema(
    {
        id_usuario: {
            type: mongoose.Schema.Types.ObjectId,
            requiered: true,
            ref: NOMBRE_COLECCION_USUARIO /* Es la coneccion que hacemos referecia.
             En este caso la referencia se saca de el Schema de Usuario */
        }, /* Esto es una fk, pero como en MD no se usa la fk, en un trabajo de verdad no se usa */

        id_espacio_trabajo: {
            type: mongoose.Schema.Types.ObjectId,
            requiered: true,
            ref: NOMBRE_COLECCION_ESPACIO_TRABAJO
        },
        rol: {
            type: String,
            enum: ['user', 'admin', 'owner'],
            default: 'user'
        },
        fecha_creacion:{
            type: Date,
            default: Date.now
        },
        activo:{
            type: mongoose.Schema.Types.Boolean,
            default: false
        }
    }
)

export const NOMBRE_COLECCION_MIEMBRO = 'Miembro'

const Miembro = mongoose.model(NOMBRE_COLECCION_MIEMBRO, miembroSchema)

export default Miembro