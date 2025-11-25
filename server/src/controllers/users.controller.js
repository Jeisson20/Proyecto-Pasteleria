
import { UserFacade } from "../facade/UserFacade.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserFacade.listUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await UserFacade.updateUser(req.params.id, req.body);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await UserFacade.deleteUser(req.params.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json({ message: "Usuario eliminado correctamente", user });
    } catch (error) {
        // Manejo del error específico lanzado por la facade cuando el usuario
        // tiene pedidos relacionados. Devolvemos 400 para que el frontend
        // pueda informar al administrador que no es posible eliminarlo.
        if (error.message === "USER_HAS_ORDERS") {
            return res.status(400).json({ message: "No se puede eliminar el usuario porque está relacionado con un pedido" });
        }
        // Otros errores: 500 interno.
        res.status(500).json({ message: error.message });
    }
};