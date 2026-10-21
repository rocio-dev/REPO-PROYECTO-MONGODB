class workspace_repository{
    async crearEspacioTrabajo (){
        await  Workspace.create ({nombre: nombre, descripcion: descripcion})
}
}

const workspace_repository = new WorkspaceRepository