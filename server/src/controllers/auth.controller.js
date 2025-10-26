// Importamos el pool de PostgreSQL para realizar consultas
import pool from '../db.js'

// Importamos bcryptjs para encriptar y comparar contraseñas
import bcrypt from 'bcryptjs'

// Función personalizada para generar tokens JWT
import { createAccessToken } from '../libs/jwt.js'

// Importamos jsonwebtoken para verificar tokens
import jwt from 'jsonwebtoken'

// Clave secreta para firmar/verificar tokens
import { TOKEN_SECRET } from '../config.js'


export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Verificamos si el correo ya está registrado
        const searchResult = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])
        const userFound = searchResult.rows[0]
        if (userFound)
            return res.status(400).json(["El correo ya está en uso"])

        // Encriptamos la contraseña
        const hashedPassword = await bcrypt.hash(password, 10)

        // Insertamos el nuevo usuario en la base de datos
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email, rol',
            [username, email, hashedPassword]
        )

        const newUser = result.rows[0]

        // Generamos el token de acceso
        const token = await createAccessToken({ id: newUser.id, rol: newUser.rol })

        // Guardamos el token en una cookie
        res.cookie('token', token)

        // Respondemos con los datos del nuevo usuario
        res.json(newUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        // Buscamos el usuario por correo
        const searchResult = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])
        const userFound = searchResult.rows[0]
        if (!userFound) return res.status(404).json({ message: 'Email no encontrado' })

        // Comparamos la contraseña ingresada con la almacenada
        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' })

        // Generamos el token de acceso
        const token = await createAccessToken({ id: userFound.id, rol: userFound.rol })

        // Guardamos el token en una cookie
        res.cookie('token', token)

        // Respondemos con los datos del usuario
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
    // Eliminamos la cookie del token
    res.cookie('token', "", {
        expires: new Date(0)
    })
    res.sendStatus(200)
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies

    // Si no hay token, denegamos el acceso
    if (!token) return res.status(401).json({ message: 'No autorizado' })

    // Verificamos el token
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'No autorizado' })

        // Buscamos el usuario en la base de datos
        const searchResult = await pool.query('SELECT id, nombre, email, rol FROM usuarios WHERE id = $1', [user.id])
        const userFound = searchResult.rows[0]
        if (!userFound) return res.status(401).json({ message: 'No autorizado' })

        // Respondemos con los datos del usuario
        return res.json({ id: user.id, nombre: userFound.nombre, email: userFound.email, rol: userFound.rol })
    })
}
