import pool from '../db.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const searchResult = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])

        const userFound = searchResult.rows[0]
        if (userFound)
            return res.status(400).json(["El correo ya esta en uso"])

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email, rol',
            [username, email, hashedPassword]
        );

        const newUser = result.rows[0]
        const token = await createAccessToken({ id: newUser.id, rol: newUser.rol })

        res.cookie('token', token)
        res.json(newUser)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const searchResult = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])

        const userFound = searchResult.rows[0]
        if (!userFound) return res.status(404).json({ message: 'Email no encontrado' })

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' })

        const token = await createAccessToken({ id: userFound.id, rol: userFound.rol })

        res.cookie('token', token)
        res.json({
            id: userFound.id,
            nombre: userFound.nombre,
            email: userFound.email,
            rol: userFound.rol
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    res.sendStatus(200)
}

export const profile = async (req, res) => {
    const userFound = await pool.query('SELECT id, nombre, email, rol FROM usuarios WHERE id = $1', [req.user.id])
    if (!userFound) return res.status(404).json({ message: 'Usuario no encontrado' })

    const user = userFound.rows[0]
    res.json({
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
    })
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: 'No autorizado' })

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'No autorizado' })

        const searchResult = await pool.query('SELECT id, nombre, email, rol FROM usuarios WHERE id = $1', [user.id])
        const userFound = searchResult.rows[0]
        if (!userFound) return res.status(401).json({ message: 'No autorizado' })

        return res.json({ id: user.id, nombre: userFound.nombre, email: userFound.email, rol: userFound.rol })
    })
}