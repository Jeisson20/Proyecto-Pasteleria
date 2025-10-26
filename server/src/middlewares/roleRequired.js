// Middleware que verifica si el usuario tiene rol de administrador
// Se usa después de authRequired para asegurar que req.user exista

export const adminRequired = (req, res, next) => {
    // Verifica que el rol del usuario sea exactamente "admin"
    if (req.user.rol !== "admin") {
        // Si no lo es, deniega el acceso
        return res.status(403).json({ message: "Acceso denegado" })
    }

    // Si el rol es válido, continúa con el siguiente middleware o controlador
    next()
}

