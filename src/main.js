import connectMongoDB from "./config/connectDB.js";
import mongoose from "mongoose";
import Usuario from "./models/user.model.js";
import Workspace from "./models/workspace.model.js";

connectMongoDB();


function crearUsuario () {
    Usuario.create({nombre: nombre, contraseña: contraseña,email: email})
}

//crearUsuario()


function crearEspacioTrabajo (){
    Workspace.create ({nombre: nombre, descripcion: descripcion})
}

//crearEspacioTrabajo()

