import express, { NextFunction, Request, Response } from "express";
import { auth } from "../../middleware/authVerify";
import { UserRole } from "@prisma/client";
import { doctorSpecialties } from "./specialities.controller";
import { fileUploader } from "../../../helpers/imgFileUploder";
const router = express.Router();

router.post(
  "/create-doctor-specialities",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    return doctorSpecialties.createDoctorSpecialites(req,res,next)
  },
);

export const doctor_sepecialRoutes = router;
