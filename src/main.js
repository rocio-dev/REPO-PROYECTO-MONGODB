import connectMongoDB from "./config/connectDB.js";
import mongoose from "mongoose";
import Usuario from "./models/user.model.js";
import Workspace from "./models/workspace.model.js";

connectMongoDB();


function crearUsuario () {
    Usuario.create({nombre:'Pepito', contraseña:'pepito123',email:'pepito@gmail.com'})
}

//crearUsuario()

function crearEspacioTrabajo (){
    Workspace.create ({nombre: 'General', descripcion: 'Se habla de todo'})
}

//crearEspacioTrabajo()
