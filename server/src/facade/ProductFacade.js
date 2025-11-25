
import pool from "../db.js";
import { ProductFactory } from "../factories/ProductFactory.js";

// Nota: este facade gestiona las operaciones SQL para la entidad `productos`.
// Los cambios introducidos aquí permiten:
// - Persistir `ganancia_percent` y `costo` en la tabla `productos`.
// - Cuando se crea un producto con el mismo `nombre`, en lugar de duplicarlo,
//   se incrementa su `stock` y se actualizan `precio`, `descripcion`, `imagen_url`,
//   `ganancia_percent` y `costo` (comportamiento de "merge" por nombre).
// - Evitar eliminar productos que estén relacionados con pedidos.

export class ProductFacade {
    static async listProducts() {
        const result = await pool.query(
            "SELECT id, nombre, descripcion, precio, imagen_url, stock, ganancia_percent, costo FROM productos ORDER BY id ASC"
        );
        return result.rows.map(ProductFactory);
    }

    static async createProduct(data) {
        // If producto with same nombre exists, increment stock and update price/description/image
        const existingRes = await pool.query(`SELECT * FROM productos WHERE nombre = $1`, [data.nombre]);
        const profitPercent = data.gananciaPercent ?? null;
        let computedPrice = data.precio;
        if (profitPercent != null && data.costo != null) {
            computedPrice = Number(data.costo) * (1 + Number(profitPercent) / 100);
        }

        if (existingRes.rows.length > 0) {
            const existing = existingRes.rows[0];
            const newStock = Number(existing.stock ?? 0) + Number(data.stock ?? 0);
            const gananciaToSave = profitPercent ?? existing.ganancia_percent ?? 0;
            const costoToSave = data.costo ?? existing.costo ?? 0;
            const result = await pool.query(
                `UPDATE productos SET descripcion=$1, precio=$2, stock=$3, imagen_url=$4, ganancia_percent=$5, costo=$6 WHERE id=$7 RETURNING *`,
                [data.descripcion ?? existing.descripcion, computedPrice ?? existing.precio, newStock, data.imagen_url ?? existing.imagen_url, gananciaToSave, costoToSave, existing.id]
            );
            return ProductFactory(result.rows[0]);
        }

        const result = await pool.query(
            `INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, ganancia_percent, costo)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [data.nombre, data.descripcion, computedPrice, data.imagen_url, data.stock ?? 0, profitPercent ?? 0, data.costo ?? 0]
        );
        const product = ProductFactory(result.rows[0]);
        return product;
    }

    static async updateProduct(id, data) {
        const result = await pool.query(
            `UPDATE productos
       SET nombre=$1, descripcion=$2, precio=$3, stock=$4, imagen_url=$5, ganancia_percent=$6, costo=$7
       WHERE id=$8 RETURNING *`,
            [data.nombre, data.descripcion, data.precio, data.stock, data.imagen_url, data.ganancia_percent ?? 0, data.costo ?? 0, id]
        );
        const product = ProductFactory(result.rows[0]);
        return product;
    }

    static async deleteProduct(id) {
        // Prevent deletion if product is related to any order
        const rel = await pool.query(`SELECT COUNT(*)::int AS cnt FROM detalle_pedidos WHERE producto_id = $1`, [id]);
        if (rel.rows[0].cnt > 0) {
            const err = new Error("PRODUCT_HAS_ORDERS");
            throw err;
        }

        const result = await pool.query("DELETE FROM productos WHERE id=$1 RETURNING *", [id]);
        return result.rowCount > 0;
    }
}