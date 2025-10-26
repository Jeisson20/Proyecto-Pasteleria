import { Router } from "express"
import {
    getAllUsers,
    getAUser,
    updateUser,
    deleteUser
} from "../controllers/users.controller.js"
import { authRequired } from "../middlewares/validateToken.js"
import { adminRequired } from "../middlewares/roleRequired.js"

const router = Router()

router.get("/users", authRequired, adminRequired, getAllUsers)
router.get("/users/:id", authRequired, adminRequired, getAUser)
router.put("/users/:id", authRequired, adminRequired, updateUser)
router.delete("/users/:id", authRequired, adminRequired, deleteUser)

export default router
