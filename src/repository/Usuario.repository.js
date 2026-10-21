/* Un repository es donde manejamos la comunicacion de nuestros datos 
Esta carpeta sirve para la comunicacion de la base de datos y el usuario */

import Usuario from "../models/user.model"

class UsuarioRepository{

    async crearUsuario () {
        await Usuario.create({nombre: nombre, contraseña: contraseña, email: email})
    }

    async BuscarUsuario() {
        const resultado= await Usuario.find()
        console.log(resultado)
        return resultado 
    }
    async BuscarUsuarioporNombre(nombre) {
        const resultado= await Usuario.find ({
            nombre:nombre,
            activo:true
        })

        console.log (resultado)
    }

    async BuscarUsuarioporTermino(term) {
        const resultado= await Usuario.find({
            nombre:{
                $regex: term, // 
                $options: 'i' // Permite buscar a los usuarios sin importar si el nombre este en mayusculas y minisculas
            },
            activo: true
        }).limit(5) //Es un limite que se pone cuando hay mucho usuarios
                    //En este caso te trae 5 usuarion con el nombre que buscas

        console.log(resultado)
    }

    async BuscarUsuarioPorFecha(min_date, max_date) { //Busca el usuario por un rango de fecha min y max
        const resultado= await Usuario.find({
            fecha_de_creacion:{
                $gte: new Date (min_date),
                $lt: new Date (max_date)
            }
        })
    }
    async BuscarporId(usuario_id) {
        const resultado= await Usuario.findByid(usuario_id)
        console.log(resultado)
    }

    async BuscarUsuarioporEmail(email) {
        const resultado= await Usuario.findOne({email:email})
        console.log(resultado)
    }

    async EliminarUsuarioporId(usuario_id) {
        await Usuario.findByIdAndDelete (usuario_id)
    }

    /* async UsuarioInactivo(usuario_id) {
        await Usuario.findByIdAndUpdate(usuario_id, {activo: false})
        console.log(resultado)
    } Ctrl + Alt + A*/

    }

const usuario_repository = new UsuarioRepository()

export default usuario_repository