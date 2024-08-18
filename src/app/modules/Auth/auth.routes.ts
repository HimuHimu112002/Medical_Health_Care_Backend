import express, { NextFunction,Response,Request } from "express";
import { authControllerService } from "./auth.controller";
import { auth } from "../../middleware/authVerify";
const router = express.Router();

router.post("/login",authControllerService.authController);
router.post("/refressToken", auth("ADMIN"), authControllerService.refressController);

export const authRoutes = router;