import usuario_repository from "../repository/Usuario.repository"
import ServerError from "../utils/error.utils"

export async function registrarse (request, response) {


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