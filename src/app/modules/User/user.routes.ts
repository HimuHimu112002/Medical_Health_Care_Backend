import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import {AdminValidations,} from "../Admin/admin.validationSchema";
import { auth } from "../../middleware/authVerify";
import { fileUploader } from "../../../helpers/imgFileUploder";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.post(
  "/create-admin",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = AdminValidations.createAdminValidation.parse(JSON.parse(req.body.data))
    return userController.createAdmin(req,res,next);
  }
);

router.post(
  "/create-doctor",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = AdminValidations.createAdminValidation.parse(JSON.parse(req.body.data))
    return userController.createAdmin(req,res,next);
  }
);

export const userRoutes = router;
