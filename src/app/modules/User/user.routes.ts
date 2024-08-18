import express from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validationRequest";
import { updateAdminValidationSchema } from "../Admin/admin.validationSchema";
import { auth } from "../../middleware/authVerify";
const router = express.Router();

router.post("/create-admin", auth("ADMIN"), validateRequest(updateAdminValidationSchema), userController.createAdmin);

export const userRoutes = router;
