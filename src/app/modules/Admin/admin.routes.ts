import express from "express";
import { adminController } from "./admin.controller";
import { auth } from "../../middleware/authVerify";
const router = express.Router();

router.get("/get-admin", auth("ADMIN"), adminController.fetchAllAdminData);
router.get("/search-admin", adminController.searchAdminData);
router.get("/getID-admin/:id", adminController.getIdAdminData);
router.patch("/update-admin/:id",auth("ADMIN"),adminController.updateAdminData);
router.delete("/delete-admin/:id", auth("ADMIN"),adminController.deleteAdminData);
router.delete("/softdelete-admin/:id", auth("ADMIN"), adminController.softdeleteAdminData);
export const adminRoutes = router;
