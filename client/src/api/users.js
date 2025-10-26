// Importamos la instancia personalizada de Axios 
import axios from "./axios.js"

// Obtener todos los usuarios
// Realiza una petición GET al endpoint /users
export const getUsersRequest = () => axios.get("/users")

// Actualizar un usuario por ID
// Realiza una petición PUT al endpoint /users/:id con los datos actualizados
export const updateUserRequest = (id, data) =>
    axios.put(`/users/${id}`, data)

// Eliminar un usuario por ID
// Realiza una petición DELETE al endpoint /users/:id
export const deleteUserRequest = (id) =>
    axios.delete(`/users/${id}`)
