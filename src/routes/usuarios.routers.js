import express from "express";
import { obtener_usuarios, usuario_X_ID } from "../controllers/controllers.usuario.js";

const usuarios_router= express.Router()

usuarios_router.get('/lista', obtener_usuarios)
usuarios_router.get('/:users_id', usuario_X_ID)

export default usuarios_router