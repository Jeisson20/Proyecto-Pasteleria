
export const adminRequired = (req, res, next) => {
    if (req.user.rol !== "admin") {
        return res.status(403).json({ message: "Acceso denegado" })
    }

    next()
}

