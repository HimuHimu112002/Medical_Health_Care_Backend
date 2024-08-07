import express from "express";
import { adminController } from "./admin.controller";
const router = express.Router();

router.get("/get-admin", adminController.fetchAllAdminData);
router.get("/search-admin", adminController.searchAdminData);

export const adminRoutes = router;
