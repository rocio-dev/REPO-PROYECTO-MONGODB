/* Repositorio para la gestión de miembros en la base de datos */
import Miembro from "../models/member.model.js";
import Usuario from "../models/user.model.js";
import Workspace from "../models/workspace.model.js";

class MemberRepository {

    async crearMiembro(usuario_id,workspace_id,role){
        await Miembro.create({
            id_usuario: usuario_id,
            id_espacio_trabajo: workspace_id,
            rol: role}
        )
        return resultado;
    }

    // 1. Buscar miembros (todos o por ID/filtro)
    async buscarMiembros() {
        const resultado = await Miembro.find()
            .populate('id_usuario')
            .populate('id_espacio_trabajo');
        console.log(resultado);
        return resultado;
    }


    // Buscar miembro por ID específico
    async buscarMiembroPorId(id_miembro) {
        const resultado = await Miembro.findById(id_miembro)
            .populate('id_usuario')
            .populate('id_espacio_trabajo');
        console.log(resultado);
        return resultado;
    }

    // 2. Buscar miembro por el nombre del usuario
    async buscarMiembroPorNombre(nombre) {
        const usuarios = await Usuario.find({
            nombre: { $regex: nombre, $options: 'i' }
        });

        const idsUsuarios = usuarios.map(u => u._id);

        // Buscamos los miembros que pertenezcan a esos usuarios (o por nombre si existiera en el schema)
        const resultado = await Miembro.find({
            $or: [
                { id_usuario: { $in: idsUsuarios } },
                { nombre: { $regex: nombre, $options: 'i' } }
            ]
        })
        .populate(
            'id_usuario',
            'nombre'
        )
        .populate(
            'id_espacio_trabajo',
            'nombre descripcion'
        );

        console.log(resultado);
        return resultado;
    }

    // 3. Que el miembro pueda unirse a un espacio de trabajo
    async unirseAEspacioTrabajo(id_usuario, id_espacio_trabajo, rol = 'user') {
        // Verificamos si ya existe el registro de este usuario en el espacio de trabajo
        let miembroExistente = await Miembro.findOne({
            id_usuario: id_usuario,
            id_espacio_trabajo: id_espacio_trabajo
        });

        if (miembroExistente) {
            // Si ya existe (por ejemplo, si estaba inactivo), lo activamos y actualizamos rol si aplica
            miembroExistente.activo = true;
            if (rol) miembroExistente.rol = rol;
            await miembroExistente.save();
            console.log("El miembro ya existía y fue reactivado en el espacio de trabajo:", miembroExistente);
            return miembroExistente;
        }

        // Si no existe, creamos el nuevo miembro con activo en true
        const nuevoMiembro = await Miembro.create({
            id_usuario: id_usuario,
            id_espacio_trabajo: id_espacio_trabajo,
            rol: rol,
            activo: true
        });

        console.log("Miembro unido exitosamente al espacio de trabajo:", nuevoMiembro);
        return nuevoMiembro;
    }


    // 4. Que el miembro pueda salir del espacio de trabajo
    async salirDeEspacioTrabajo(id_usuario_o_miembro, id_espacio_trabajo) {
        let resultado;

        if (id_espacio_trabajo) {
            // Si se envían id_usuario e id_espacio_trabajo
            resultado = await Miembro.findOneAndUpdate(
                {
                    id_usuario: id_usuario_o_miembro,
                    id_espacio_trabajo: id_espacio_trabajo
                },
                { activo: false },
                { new: true }
            );
        } else {
            // Si se envía directamente el id del documento Miembro
            resultado = await Miembro.findByIdAndUpdate(
                id_usuario_o_miembro,
                { activo: false },
                { new: true }
            );
        }

        if (!resultado) {
            console.log("No se encontró el miembro para salir del espacio de trabajo.");
            return null;
        }

        console.log("El miembro ha salido del espacio de trabajo (marcado como inactivo):", resultado);
        return resultado;
    }

    async eliminarMiembroPorId(id_miembro) {
        const resultado = await Miembro.findByIdAndDelete(id_miembro);
        console.log("Miembro eliminado por completo:", resultado);
        return resultado;
    }

    async eliminarMiembroDeEspacioTrabajo(id_usuario, id_espacio_trabajo) {
        const resultado = await Miembro.findOneAndDelete({
            id_usuario: id_usuario,
            id_espacio_trabajo: id_espacio_trabajo
        });
        console.log("Miembro eliminado del espacio de trabajo:", resultado);
        return resultado;
    }

    async buscarTodoslosEspaciosTrabajos(usuario_id){
        const resultado= await Miembro.find({id_usuario:usuario_id})
        .populate(
            'id_espacio_trabajo',
            'nombre fecha_creacion'
        )
        return resultado
    }

    async TodoslosMiemmbrosdeUnEspacioTrabajo(workspace_id) {
        const resultado = await Workspace.find({id_espacio_trabajo:workspace_id})
        .populate(
            'id_usuario',
            'nombre email'
        )
        return resultado

    }
}

const member_repository = new MemberRepository();

export default member_repository;
export { MemberRepository };
