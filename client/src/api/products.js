import axios from "./axios.js";

export const getProductsRequest = () => axios.get("/products");

export const createProductRequest = (data) => axios.post("/products", data);

export const updateProductRequest = (id, data) => axios.put(`/products/${id}`, data);

export const deleteProductRequest = (id) => axios.delete(`/products/${id}`);