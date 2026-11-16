import connectMongoDB from "./config/connectDB.js";

connectMongoDB();

import express, { request, response } from 'express'
import middleware_error_server from "./middleware/error.middleware.js";
import { obtener_usuarios } from "./controllers/controllers.usuario.js";
import { usuario_X_ID } from "./controllers/controllers.usuario.js";
import { registrarse } from "./controllers/controllers.registro.js";

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

/* app.get(
    '/api/status',
    (request,response,) =>
    {
        throw new ServerError("No estas autentificado, 401")
            console.log(pepe)
            response.send('<h1>Request recibida</h1>')

        
    }
) */

app.post(
    '/api/auth/registro',
    registrarse
)

app.get(
    '/api/usuarios',
    obtener_usuarios

)

app.get(
    '/api/usuarios/:user_id',
    usuario_X_ID
    )

    app.use(
        middleware_error_server
    )