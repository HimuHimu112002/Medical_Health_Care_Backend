import express from "express";
import { userRoutes } from "../User/user.routes";
import { adminRoutes } from "../Admin/admin.routes";
const router = express.Router();
const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
