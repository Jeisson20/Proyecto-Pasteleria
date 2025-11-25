
import pool from "../db.js";
import { UserFactory } from "../factories/UserFactory.js";

export class UserFacade {
    static async listUsers() {
        const result = await pool.query(
            "SELECT id, nombre, email, rol, permisos FROM usuarios ORDER BY id ASC"
        );
        return result.rows.map(UserFactory);
    }

    static async updateUser(id, { rol, permisos }) {
        const result = await pool.query(
            `UPDATE usuarios SET rol=$1, permisos=$2 WHERE id=$3 RETURNING *`,
            [rol, permisos, id]
        );
        if (result.rows.length === 0) return null;
        const user = UserFactory(result.rows[0]);
        return user;
    }

    static async deleteUser(id) {
        // Evita eliminar un usuario que tenga pedidos relacionados.
        // Razonamiento: si un usuario tiene pedidos, mantener la integridad
        // referencial y el historial de ventas es importante; en lugar de
        // borrar se podría desactivar, pero aquí devolvemos un error específico
        // para que el controlador lo transforme en un 400 y el cliente muestre
        // un mensaje claro al administrador.
        const rel = await pool.query(`SELECT COUNT(*)::int AS cnt FROM pedidos WHERE usuario_id = $1`, [id]);
        if (rel.rows[0].cnt > 0) {
            const err = new Error("USER_HAS_ORDERS");
            throw err;
        }

        const result = await pool.query(
            `DELETE FROM usuarios WHERE id=$1 RETURNING *`,
            [id]
        );
        if (result.rows.length === 0) return null;
        const user = UserFactory(result.rows[0]);
        return user;
    }
}