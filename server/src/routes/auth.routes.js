// Importamos los controladores que manejan la lógica de autenticación
import { login, register, logout, verifyToken } from "../controllers/auth.controller.js"

// Importamos Router desde Express para definir rutas modularmente
import { Router } from "express"

// Importamos el middleware que valida los datos con Zod
import { validateSchema } from "../middlewares/validator.middleware.js"

// Importamos los esquemas de validación para login y registro
import { registerSchema, loginSchema } from "../schemas/auth.schema.js"

const router = Router()

// Ruta para registrar un nuevo usuario
// Valida el cuerpo de la petición con registerSchema antes de ejecutar el controlador
router.post('/register', validateSchema(registerSchema), register)

// Ruta para iniciar sesión
// Valida el cuerpo de la petición con loginSchema antes de ejecutar el controlador
router.post('/login', validateSchema(loginSchema), login)

// Ruta para cerrar sesión (puede eliminar cookies o tokens en el cliente)
router.post('/logout', logout)

// Ruta para verificar si el token JWT es válido (usada en frontend para mantener sesión activa)
router.get("/verify", verifyToken)

export default router
