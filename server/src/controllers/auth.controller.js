
import { AuthFacade } from "../facade/AuthFacade.js";

export const register = async (req, res) => {
    try {
        const { user, token } = await AuthFacade.register(req.body);
        res.cookie("token", token, { httpOnly: true });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { user, token } = await AuthFacade.login(req.body);
        res.cookie("token", token, { httpOnly: true });
        res.json(user);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const verifyToken = async (req, res) => {
    try {
        const user = await AuthFacade.verify(req.cookies.token);
        res.json(user);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};