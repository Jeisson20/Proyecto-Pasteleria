// Importamos el pool de conexiones a PostgreSQL
import pool from "../db.js"

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        // Consulta SQL para obtener todos los usuarios ordenados por ID
        const result = await pool.query(
            `SELECT id, nombre, email, rol, permisos FROM usuarios ORDER BY id ASC`
        )

        // Respondemos con el array de usuarios
        res.json(result.rows)
    } catch (error) {
        // Si ocurre un error, respondemos con estado 500 y el mensaje
        res.status(500).json({ message: error.message })
    }
}

// Actualizar rol y permisos de un usuario
export const updateUser = async (req, res) => {
    const { id } = req.params
    const { rol, permisos } = req.body
    try {
        // Consulta SQL para actualizar el rol y permisos del usuario
        const result = await pool.query(
            `UPDATE usuarios SET rol = $1, permisos = $2 WHERE id = $3 RETURNING *`,
            [rol, permisos, id]
        )

        // Si no se encuentra el usuario, respondemos con estado 404
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }

        // Respondemos con el usuario actualizado
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//  Eliminar un usuario por ID
export const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        // Consulta SQL para eliminar el usuario
        await pool.query(`DELETE FROM usuarios WHERE id = $1`, [id])

        // Respondemos con estado 204 
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
