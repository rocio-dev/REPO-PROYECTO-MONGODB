import usuario_repository from "../repository/Usuario.repository.js"
import ServerError from "../utils/error.utils.js"
import { comprobar_hash, incriptacion_contraseña } from "../utils/bcrypt.utils.js"
import Usuario from "../models/user.model.js"

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

            const contraseña_hash = await incriptacion_contraseña(contraseña)
    
            await usuario_repository.crearUsuario(nombre, contraseña_hash, email)
    
            return response.send({
                message: "Ya estas registrado. Bienvenido",
                ok:true,
                status: 201
        })
    
        }


export async function login(request, response) {

    const {email, contraseña} = request.body

        if (
        !email || !contraseña || typeof email !== "string" || typeof password !== "string"
            ){
        throw new ServerError(
            "La contraseña y el email son requeridos",
            400
        )
    }

        if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
                throw new ServerError(
                    "Email es incorrecto",
                    400
                )
            }
    
    const verificar_email= await usuario_repository.BuscarUsuarioporEmail(email)
        if(!verificar_email){
            throw new ServerError(
                "Usuario no encontrado",
                404
            )
        }
    const contraseñaValida= await comprobar_hash(contraseña, Usuario.contraseña)
        if (!contraseñaValida){
            throw new ServerError(
                "Credencial incorrecta",
                400
            )
        }

    return response.send({
        message: "Te pudiste logear correctamente",
        ok:true,
        status:200
})
}