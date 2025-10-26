// Middleware que valida el cuerpo de la petición usando un esquema Zod
export const validateSchema = (schema) => (req, res, next) => {
    try {
        // Intenta validar el cuerpo de la petición con el esquema proporcionado
        schema.parse(req.body)

        // Si la validación es exitosa, continúa con el siguiente middleware o controlador
        next()
    } catch (err) {
        // Si hay errores de validación específicos (estructura Zod), los extrae
        if (err.issues) {
            const errors = err.issues.map((issue) => issue.message) // Extrae solo los mensajes
            return res.status(400).json(errors) // Devuelve errores al cliente con estado 400
        }

        // Si ocurre un error inesperado (no relacionado con Zod), responde con estado 500
        return res.status(500).json({ errors: ["Error de validación inesperado"] })
    }
}

