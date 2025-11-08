import { Router } from "express";
import { createOrder, getOrders, updateOrder, deleteOrder } from "../controllers/orders.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/roleRequired.js";

const router = Router();

router.post("/orders", authRequired, createOrder);

router.get("/orders", authRequired, getOrders);

router.put("/orders/:id", authRequired, adminRequired, updateOrder);

router.delete("/orders/:id", authRequired, adminRequired, deleteOrder);

export default router;