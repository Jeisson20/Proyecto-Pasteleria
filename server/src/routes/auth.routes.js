import { login, register, verifyToken } from "../controllers/auth.controller.js"
import { Router } from "express"
import { validateSchema } from "../middlewares/validator.middleware.js"

const router = Router()

router.post('/register', validateSchema('register'), register)

router.post('/login', validateSchema('login'), login)

router.get("/verify", verifyToken)

export default router
