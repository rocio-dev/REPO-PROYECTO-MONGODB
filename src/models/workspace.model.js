import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
    {
        nombre:{
            type: String,
            requiered: true,
            maxlength: 30
        },

        descripcion:{
            type:String,
            maxlength: 200
        },
        fecha_de_creacion:{
            type:Date,
            default: Date.now
        }
    }
);

export const NOMBRE_COLECCION_ESPACIO_TRABAJO = 'Espacio_Trabajo'

const Workspace = mongoose.model(NOMBRE_COLECCION_ESPACIO_TRABAJO, workspaceSchema);

export default Workspace;
