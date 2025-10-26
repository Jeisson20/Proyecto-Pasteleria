// Importamos la clave secreta usada para firmar el token JWT
import { TOKEN_SECRET } from '../config.js'

// Importamos la librería jsonwebtoken para generar y verificar tokens
import jwt from 'jsonwebtoken'

// Función que crea un token JWT de acceso con un payload personalizado
// Devuelve una Promesa que resuelve con el token firmado
export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        // Firmamos el token con el payload y la clave secreta
        jwt.sign(
            payload, // Datos que queremos incluir en el token (ej: id, rol)
            TOKEN_SECRET, // Clave secreta para firmar el token
            {
                expiresIn: "1d", // El token expirará en 1 día
            },
            (err, token) => {
                // Si ocurre un error al firmar, rechazamos la promesa
                if (err) reject(err)

                // Si todo va bien, resolvemos la promesa con el token generado
                resolve(token)
            }
        )
    })
}
