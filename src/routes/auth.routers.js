import express from "express";
import { login, registrarse } from "../controllers/controllers.registro.js";

const auth_router = express.Router()

auth_router.post('/registro', registrarse)
auth_router.post('/login', login)


export default auth_router