import express, { NextFunction,Response,Request } from "express";
import { authControllerService } from "./auth.controller";
import { auth } from "../../middleware/authVerify";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.post("/login",authControllerService.authController);
router.post("/refressToken", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), authControllerService.refressController);

export const authRoutes = router;