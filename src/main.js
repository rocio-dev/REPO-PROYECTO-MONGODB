import connectMongoDB from "./config/connectDB.js";

connectMongoDB();

import express, { request, response } from 'express'
import usuario_repository from "./repository/Usuario.repository.js";
import ServerError from "./utils/error.utils.js";

const PORT = 8080

const app= express()

//Configuramos nuestra API para que el body pueda ser tipo de dato JSON
//A esto se le llama "Middleware"
app.use(express.json())

app.listen(
    PORT,
    () => {
        console.log(
            `El servidor se esta escuchando perfectamente de http://localhost:${PORT}`)
    }
)

app.get(
    '/api/status',
    (request,response) =>
    {response.send('<h1>Request recibida</h1>')}
)

app.post(
    '/api/auth/registro',
    async (request,response) =>
    {
        try{

            console.log("[Registro]",request.body)
    
            const {nombre, contraseña, email}= request.body
    
            if(!nombre|| !contraseña || !email){
                throw new ServerError(
                "Es requerido el Nombre, contraseña y email para registrarte",
                400
                )
            }
    
            if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
                throw new ServerError(
                    "Email es incorrecto",
                    400
                )

        }
    
            const email_utilizado = await usuario_repository.BuscarUsuarioporEmail(email)
            if(email_utilizado){
                throw new ServerError(
                    "Ya hay una cuenta con este Email",
                    400
                )
            }
    
            await usuario_repository.crearUsuario(nombre, contraseña, email)
    
            return response.send({
                message: "Ya estas registrado. Bienvenido",
                ok:true,
                status: 201
        })
    
        }
        //Error controlado
        catch(error){
            if (error.status){
                return response.send({
                    ok:false,
                    status: error.status,
                    message: error.message
                    }
                )
            }
            //Error inesperado*
            else{
                console.error ('[Server Error]', error.message)
                return response.send({
                    ok:false,
                    status: 500,
                    message: "Error interno del servidor"
                    }
                )
            }
        }
    }
)

app.get(
    '/api/usuarios',
    async (request,response) => {

        try{
            const lista_usuario = await usuario_repository.BuscarUsuario()
            response.send({
                message:"Obtener la lista de Usuarios",// Mensaje de la operacion
                ok: true, //Indica si se resolvio o no
                status: 200,
                data:{
                    Usuarios: lista_usuario
                }
            })/* Aca determinamos el formato de como nos tiene que dar la info */
        }
        catch(error) {
            response.send({
                message: "Error interno del servidor",
                ok: false,
                status: 500
            })
        }
    }
)

app.get(
    '/api/usuarios/:user_id',
    async (request,response) => {
        try{

            const ID_Usuario= request.params.user_id // Accedemos a los parametros de la URL
            const usuario = await usuario_repository.BuscarporId(ID_Usuario)

            if(!usuario){
                return   response.send({
                    message: "No se encontro a este Usuario",
                    ok: false,
                    status: 404
                    }
                )
            }

            return response.send({
                message: "Consegui los detalles del usuario exitosamente",
                ok: true,
                status: 200,
                data: {
                    User: usuario
                }
            })
        }

        catch(error) {
            console.error(error)
            response.send({
                    message: "Error interno del servidor",
                    ok: false,
                    status: 500
                })
        }
    }
)