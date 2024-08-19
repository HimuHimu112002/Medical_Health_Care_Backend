import express from "express";
import { adminController } from "./admin.controller";
import { auth } from "../../middleware/authVerify";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.get("/get-admin", adminController.fetchAllAdminData);
router.get("/search-admin", adminController.searchAdminData);
router.get("/getID-admin/:id", adminController.getIdAdminData);
router.patch("/update-admin/:id",auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),adminController.updateAdminData);
router.delete("/delete-admin/:id", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),adminController.deleteAdminData);
router.delete("/softdelete-admin/:id", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), adminController.softdeleteAdminData);
export const adminRoutes = router;
