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
const Workspace = mongoose.model('EspacioTrabajo', workspaceSchema);

export default Workspace;
