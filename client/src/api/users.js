import axios from "./axios.js"

export const getUsersRequest = () => axios.get("/usuarios")

export const updateUserRequest = (id, data) =>
    axios.put(`/usuarios/${id}`, data)

export const deleteUserRequest = (id) =>
    axios.delete(`/usuarios/${id}`)
