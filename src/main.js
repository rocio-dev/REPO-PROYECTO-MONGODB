import connectMongoDB from "./config/connectDB.js";

connectMongoDB();

import express, { request, response } from 'express'
import usuario_repository from "./repository/Usuario.repository.js";

const PORT = 8080

const app= express()

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
            response.send({
                message: "Consegui los detalles del usuario exitosamente",
                ok: true,
                status: 200,
                data: {
                    User: usuario
                }
            })
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