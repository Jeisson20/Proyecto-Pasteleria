import axios from "./axios.js";

export const createOrderRequest = (data) => axios.post("/orders", data);

export const getOrdersRequest = () => axios.get("/orders");

export const updateOrderRequest = (id, data) => axios.put(`/orders/${id}`, data);

export const deleteOrderRequest = (id, data) => axios.delete(`/orders/${id}`, data);