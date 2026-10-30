import Workspace from "../models/workspace.model.js"
import Miembro from "../models/member.model.js"

class WorkspaceRepository {

    // Crear un nuevo espacio de trabajo
    async crearEspacioTrabajo(nombre, descripcion) {
        const resultado = await Workspace.create({ nombre: nombre, descripcion: descripcion })
        console.log(resultado)
        return resultado
    }

    // Buscar todos los espacios de trabajo
    async BuscarEspaciosTrabajo() {
        const resultado = await Workspace.find()
        console.log(resultado)
        return resultado
    }

    // Buscar espacio de trabajo por su ID
    async BuscarEspacioTrabajoporId(id_espacio_trabajo) {
        const resultado = await Workspace.findById(id_espacio_trabajo)
        console.log(resultado)
        return resultado
    }

    // Función para que el usuario creador (Owner) pueda cambiar el nombre del espacio de trabajo
    async CambiarNombreEspacioTrabajo(id_espacio_trabajo, id_usuario, nuevo_nombre) {
        // Verificamos si el usuario es el creador (rol 'owner') en la colección Miembro
        const esOwner = await Miembro.findOne({
            id_espacio_trabajo: id_espacio_trabajo,
            id_usuario: id_usuario,
            rol: 'owner'
        })

        if (!esOwner) {
            console.log("Acceso denegado: Solo el creador (Owner) puede cambiar el nombre del espacio de trabajo.")
            return null
        }

        // Si es el Owner, actualizamos el nombre del espacio de trabajo
        const resultado = await Workspace.findByIdAndUpdate(
            id_espacio_trabajo,
            { nombre: nuevo_nombre },
            { new: true } // Opción para retornar el documento actualizado
        )

        console.log("Nombre del espacio de trabajo actualizado:", resultado)
        return resultado
    }

    // Función para eliminar el espacio de trabajo (validando si el usuario es el Owner)
    async EliminarEspacioTrabajo(id_espacio_trabajo, id_usuario) {
        // Si se proporciona el id_usuario, verificamos que sea el Owner
        if (id_usuario) {
            const esOwner = await Miembro.findOne({
                id_espacio_trabajo: id_espacio_trabajo,
                id_usuario: id_usuario,
                rol: 'owner'
            })

            if (!esOwner) {
                console.log("Acceso denegado: Solo el creador (Owner) puede eliminar el espacio de trabajo.")
                return null
            }
        }

        const resultado = await Workspace.findByIdAndDelete(id_espacio_trabajo)
        console.log("Espacio de trabajo eliminado:", resultado)
        return resultado
    }

    // Función directa para eliminar el espacio de trabajo por su ID (al estilo de Usuario.repository.js)
    async EliminarEspacioTrabajoporId(id_espacio_trabajo) {
        const resultado = await Workspace.findByIdAndDelete(id_espacio_trabajo)
        console.log("Espacio de trabajo eliminado:", resultado)
        return resultado
    }

}

const workspace_repository = new WorkspaceRepository()

export default workspace_repository