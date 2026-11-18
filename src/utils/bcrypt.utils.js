import bcrypt from 'bcrypt'


export async function incriptacion_contraseña (data){

    const hash = await bcrypt.hash(data, 12)

    return hash
}

//Es para saber si el hash pertenece a cierto dato
export async function comprobar_hash (data,hash){
    const resultado = await bcrypt.compare(data,hash)
    console.log("Resultado de la comparación:", resultado)
    return resultado
}