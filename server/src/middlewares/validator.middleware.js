import { getSchema } from '../validation/auth.strategy.js';

export const validateSchema = (tipo) => (req, res, next) => {
    try {
        const schema = getSchema(tipo);
        schema.parse(req.body)

        next()
    } catch (err) {
        if (err.issues) {
            const errors = err.issues.map((issue) => issue.message)
            return res.status(400).json(errors)
        }

        return res.status(500).json({ errors: ["Error de validación inesperado"] })
    }
}
