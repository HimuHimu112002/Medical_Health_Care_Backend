import express from "express";
import { adminController } from "./admin.controller";
const router = express.Router();

router.get("/get-admin", adminController.fetchAllAdminData);
router.get("/search-admin", adminController.searchAdminData);
router.get("/getID-admin/:id", adminController.getIdAdminData);
router.patch("/update-admin/:id",adminController.updateAdminData);
router.delete("/delete-admin/:id", adminController.deleteAdminData);
router.delete("/softdelete-admin/:id", adminController.softdeleteAdminData);
export const adminRoutes = router;
