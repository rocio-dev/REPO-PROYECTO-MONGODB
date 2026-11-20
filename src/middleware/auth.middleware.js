import jwt from "jsonwebtoken"
import EVIRONMENT from "../config/environment.config.js"
import ServerError from "../utils/error.utils.js"

function authMiddleware (request, response, next){
    try{
        /* 
        Cuando un usuario haga alguna operacion que necesite auth:
                - Crear un espacio de trabajo
                - Crear un mensaje
            
            Vamos a recibir de los headers de la consulta el auth_token,
            lo solemos esperar en un header llamado authorization pero podes cambiarlo
        */
    
        const auth_header = request.headers.authorization

            if(!auth_header){
                throw new ServerError(
                    "Auth header es requerido",
                    400
                )
            }
    
        const auth_token= auth_header.split(' ') [1]

        if(!auth_token){
            throw new ServerError(
                    "Auth token es requerido",
                    400
                )
        }
    
        const {id,nombre,email}= jwt.verify(auth_token, EVIRONMENT.JWT_SECRET_KEY) // Verifica la firma

        //Mutando la request para que ahora guarde dentro 
        // de la nueva propiedad user los datos de la credencial
        request.user={
            id: id,
            nombre: nombre,
            email: email
        }
        next()
    }
    catch(error){
        //si hubo un error en el token 
        if(
            error instanceof jwt.JsonWebTokenError
            ||
            error instanceof jwt.NotBeforeError
            ||
            error instanceof jwt.TokenExpiredError
        ){
            response.status(401).send({
                ok:false,
                status:401,
                message: "Auth token es inavlido"
            })
        }

        if (error.status){
            return response.send({
                ok:false,
                status: error.status,
                message: error.message
                }
            )
        }

        console.log('[Middleware Error]', error.message)
        response.status(500).send({
                ok:false,
                status: 500,
                message: "Error interno del servidor"
        })
    }


}
export default authMiddleware