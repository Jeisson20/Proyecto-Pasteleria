
import pool from "../db.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export class AuthFacade {
    static async register({ username, email, password }) {
        const searchResult = await pool.query("SELECT * FROM usuarios WHERE email=$1", [email]);
        if (searchResult.rows[0]) throw new Error("El correo ya está en uso");

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO usuarios (nombre, email, password, rol) 
       VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, rol`,
            [username, email, hashedPassword, "cliente"]
        );

        const newUser = result.rows[0];
        const token = await createAccessToken({ id: newUser.id, rol: newUser.rol });
        return { user: newUser, token };
    }

    static async login({ email, password }) {
        const searchResult = await pool.query("SELECT * FROM usuarios WHERE email=$1", [email]);
        const userFound = searchResult.rows[0];
        if (!userFound) throw new Error("Email no encontrado");

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) throw new Error("Contraseña incorrecta");

        const token = await createAccessToken({ id: userFound.id, rol: userFound.rol });
        return { user: userFound, token };
    }

    static async verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
                if (err) return reject(new Error("No autorizado"));
                const searchResult = await pool.query(
                    "SELECT id, nombre, email, rol FROM usuarios WHERE id=$1",
                    [decoded.id]
                );
                const userFound = searchResult.rows[0];
                if (!userFound) return reject(new Error("No autorizado"));
                resolve(userFound);
            });
        });
    }
}