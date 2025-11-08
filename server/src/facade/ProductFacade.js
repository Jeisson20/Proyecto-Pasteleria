
import pool from "../db.js";
import { ProductFactory } from "../factories/ProductFactory.js";

export class ProductFacade {
    static async listProducts() {
        const result = await pool.query(
            "SELECT id, nombre, descripcion, precio, imagen_url, stock FROM productos ORDER BY id ASC"
        );
        return result.rows.map(ProductFactory);
    }

    static async createProduct(data) {
        const result = await pool.query(
            `INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [data.nombre, data.descripcion, data.precio, data.imagen_url, data.stock]
        );
        const product = ProductFactory(result.rows[0]);
        return product;
    }

    static async updateProduct(id, data) {
        const result = await pool.query(
            `UPDATE productos
       SET nombre=$1, descripcion=$2, precio=$3, stock=$4, imagen_url=$5
       WHERE id=$6 RETURNING *`,
            [data.nombre, data.descripcion, data.precio, data.stock, data.imagen_url, id]
        );
        const product = ProductFactory(result.rows[0]);
        return product;
    }

    static async deleteProduct(id) {
        const result = await pool.query("DELETE FROM productos WHERE id=$1 RETURNING *", [id]);

        return result.rowCount > 0;
    }
}