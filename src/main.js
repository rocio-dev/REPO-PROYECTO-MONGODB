import connectMongoDB from "./config/connectDB.js";

connectMongoDB();

import express, { request, response } from 'express'
import middleware_error_server from "./middleware/error.middleware.js";
import auth_router from "./routes/auth.routers.js";
import usuarios_router from "./routes/usuarios.routers.js";
import authMiddleware from "./middleware/auth.middleware.js";
import workspace_repository from "./repository/Workspace.repository.js";
import member_repository from "./repository/Member.repository.js";


const PORT = 8080

const app= express()

//Configuramos nuestra API para que el body pueda ser tipo de dato JSON
//A esto se le llama "Middleware"
app.use(express.json())


app.use(
    '/api/auth', auth_router
)

app.use(
    '/api/usuarios', usuarios_router
)

app.post(
    '/api/workspaces',authMiddleware, async (request, response) => {
        request.user
        const {nombre, descripcion} = request.body

        const crearET= await workspace_repository.crearEspacioTrabajo(nombre, descripcion)
        const membresia_owner= await member_repository.crearMiembro(
            request.user.id,
            crearET._id,
            'owner'
        )
        return response.status(200).send({
            ok:true,
            status: 200,
            message: "Todo bien por ahora",
            data:{
                crearET,
                membresia_owner
            }
        })
    }
)

app.use(
        middleware_error_server
    )

app.listen(
        PORT,
        () => {
            console.log(
                `El servidor se esta escuchando perfectamente de http://localhost:${PORT}`)
        }
    )