import { Router } from "express";
import multer from "multer";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/roleRequired.js";

const router = Router();

const upload = multer({ dest: "uploads/" });

router.get("/products", authRequired, getProducts);

router.post("/products", authRequired, adminRequired, upload.single("imagen"), createProduct);

router.put("/products/:id", authRequired, adminRequired, upload.single("imagen"), updateProduct);

router.delete("/products/:id", authRequired, adminRequired, deleteProduct);

export default router;