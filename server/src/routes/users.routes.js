import { Router } from "express"
import {
    getAllUsers,
    updateUser,
    deleteUser
} from "../controllers/users.controller.js"

import { authRequired } from "../middlewares/validateToken.js"
import { adminRequired } from "../middlewares/roleRequired.js"

const router = Router()

router.get("/usuarios", authRequired, adminRequired, getAllUsers)

router.put("/usuarios/:id", authRequired, adminRequired, updateUser)

router.delete("/usuarios/:id", authRequired, adminRequired, deleteUser)

export default router
