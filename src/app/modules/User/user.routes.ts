import express from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validationRequest";
import { updateAdminValidationSchema } from "../Admin/admin.validationSchema";
const router = express.Router();

router.post("/create-admin", validateRequest(updateAdminValidationSchema), userController.createAdmin);

export const userRoutes = router;
