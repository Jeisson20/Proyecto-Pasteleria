// Importamos la instancia personalizada de Axios 
import axios from './axios.js'

// Función para registrar un nuevo usuario
// Envía una petición POST al endpoint /register con los datos del usuario
export const registerRequest = user => axios.post("/register", user)

// Función para iniciar sesión
// Envía una petición POST al endpoint /login con email y contraseña
export const loginRequest = user => axios.post("/login", user)

// Función para verificar si el token actual es válido
// Envía una petición GET al endpoint /verify 
export const verifyTokenRequest = () => axios.get("/verify")
