// Importamos jsonwebtoken para verificar el token JWT
import jwt from 'jsonwebtoken'

// Importamos la clave secreta usada para verificar tokens
import { TOKEN_SECRET } from '../config.js'

// Middleware que protege rutas: solo permite acceso si el token es válido
export const authRequired = (req, res, next) => {
    // Extraemos el token de las cookies (usualmente llamado 'token')
    const { token } = req.cookies

    // Si no hay token, denegamos el acceso
    if (!token) {
        return res.status(401).json({ message: 'Sin token, autorización denegada' })
    }

    // Verificamos que el token sea válido usando la clave secreta
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            // Si el token es inválido o expiró, respondemos con error
            return res.status(400).json({ message: 'El token no es válido' })
        }
        req.user = user

        // Continuamos con el siguiente middleware o controlador
        next()
    })
}
