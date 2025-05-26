import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const router=Router()

router.post('/register',AuthController.register)
router.post('/login',AuthController.login)
router.use(authMiddleware)
router.get('/me',AuthController.profile)
