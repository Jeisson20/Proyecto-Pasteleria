
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
        const result = await pool.query(
            `DELETE FROM usuarios WHERE id=$1 RETURNING *`,
            [id]
        );
        if (result.rows.length === 0) return null;
        const user = UserFactory(result.rows[0]);
        return user;
    }
}