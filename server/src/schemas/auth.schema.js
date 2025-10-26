// Importamos Zod, una librería para validar datos de forma declarativa y segura
import { z } from 'zod'

// Esquema de validación para el formulario de registro
export const registerSchema = z.object({

    username: z.string({
        required_error: "El nombre de usuario es obligatorio",
    }).min(1, { message: "El nombre de usuario es obligatorio" }),


    email: z.string({
        required_error: "El correo electrónico es obligatorio",
    }).min(1, { message: "El correo electrónico es obligatorio" })
        .email({ message: "Correo electrónico inválido" }),

    password: z.string({
        required_error: "La contraseña es obligatoria",
    }).min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
})

// Esquema de validación para el formulario de login
export const loginSchema = z.object({

    email: z.string({
        required_error: "El correo electrónico es obligatorio",
    }).min(1, { message: "El correo electrónico es obligatorio" })
        .email({ message: "Correo electrónico inválido" }),

    password: z.string({
        required_error: "La contraseña es obligatoria",
    }).min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
})
