
import { ProductFacade } from "../facade/ProductFacade.js";

export const getProducts = async (req, res) => {
    try {
        const products = await ProductFacade.listProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const data = { ...req.body, imagen_url: req.file ? `/uploads/${req.file.filename}` : null };
        const product = await ProductFacade.createProduct(data);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const data = { ...req.body, imagen_url: req.file ? `/uploads/${req.file.filename}` : undefined };
        const product = await ProductFacade.updateProduct(req.params.id, data);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deleted = await ProductFacade.deleteProduct(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Producto no encontrado" });
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};