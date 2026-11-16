import usuario_repository from "../repository/Usuario.repository"
import ServerError from "../utils/error.utils"

export async function obtener_usuarios (request, response){

        
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

export async function usuario_X_ID (request, response) {


            const ID_Usuario= request.params.user_id // Accedemos a los parametros de la URL
            const usuario = await usuario_repository.BuscarporId(ID_Usuario)

            if(!usuario){
                throw new ServerError("No se encontro a este Usuario",)
                
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