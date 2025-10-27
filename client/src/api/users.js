import axios from "./axios.js"

export const getUsersRequest = () => axios.get("/users")

export const updateUserRequest = (id, data) =>
    axios.put(`/users/${id}`, data)

export const deleteUserRequest = (id) =>
    axios.delete(`/users/${id}`)
