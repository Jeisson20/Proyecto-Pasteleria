// Importamos Router desde Express para definir rutas modularmente
import { Router } from "express"

// Importamos los controladores que manejan la lógica de cada ruta
import {
    getAllUsers,   // Obtener todos los usuarios
    updateUser,    // Actualizar un usuario por ID
    deleteUser     // Eliminar un usuario por ID
} from "../controllers/users.controller.js"

// Importamos middlewares para proteger las rutas
import { authRequired } from "../middlewares/validateToken.js" // Verifica que el usuario esté autenticado
import { adminRequired } from "../middlewares/roleRequired.js" // Verifica que el usuario tenga rol de administrador

const router = Router()

// Ruta para obtener todos los usuarios (solo accesible para admins autenticados)
router.get("/users", authRequired, adminRequired, getAllUsers)

// Ruta para actualizar un usuario por ID (solo admins autenticados)
router.put("/users/:id", authRequired, adminRequired, updateUser)

// Ruta para eliminar un usuario por ID (solo admins autenticados)
router.delete("/users/:id", authRequired, adminRequired, deleteUser)

// Exportamos el router para usarlo en app.js o index.js
export default router
