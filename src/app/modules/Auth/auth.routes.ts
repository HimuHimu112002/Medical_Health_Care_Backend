import express from "express";
import { authControllerService } from "./auth.controller";
const router = express.Router();

router.post("/login", authControllerService.authController);
router.post("/refressToken", authControllerService.refressController);

export const authRoutes = router;