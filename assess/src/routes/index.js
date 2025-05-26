import { Router } from "express";
import { router as authRouters } from "./auth.routes.js";
import { router as ticketRoutes } from "./ticket.routes.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
export const router=Router()

router.use('/auth',authRouters)
router.use(authMiddleware)
router.use('/tickets',ticketRoutes)