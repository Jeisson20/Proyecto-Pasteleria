import pool from "../db.js"

export const getUsers = async () => {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC")
    return result.rows
}

export const createUser = async (user) => {
    const { name, email, password, role } = user
    const defaultPermissions = {
        productos: false,
        materia: false,
        pedidos: false,
        clientes: false
    }

    const result = await pool.query(
        `INSERT INTO users (name, email, password, role, permisos)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
        [name, email, password, role, defaultPermissions]
    )
    return result.rows[0]
}

export const updateUserPermissions = async (id, permisos, role) => {
    const result = await pool.query(
        `UPDATE users SET permisos = $1, role = $2 WHERE id = $3 RETURNING *`,
        [permisos, role, id]
    )
    return result.rows[0]
}

export const deleteUser = async (id) => {
    await pool.query(`DELETE FROM users WHERE id = $1`, [id])
}
