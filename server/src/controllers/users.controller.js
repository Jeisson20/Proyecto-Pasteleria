import pool from "../db.js"

export const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, nombre, email, rol, permisos FROM usuarios ORDER BY id ASC`
        )
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params
    const { rol, permisos } = req.body
    try {
        const result = await pool.query(
            `UPDATE usuarios SET rol = $1, permisos = $2 WHERE id = $3 RETURNING *`,
            [rol, permisos, id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }

        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        await pool.query(`DELETE FROM usuarios WHERE id = $1`, [id])

        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
