import express from "express";
import { userRoutes } from "../User/user.routes";
import { adminRoutes } from "../Admin/admin.routes";
import { authRoutes } from "../Auth/auth.routes";
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
  {
    path: "/auth",
    route: authRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
