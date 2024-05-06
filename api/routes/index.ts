import { Router } from "express";
import authGaurd from "../middlewares/auth";
import adminGaurd from "../middlewares/admin";
const app = Router();

import authRoutes from "./auth";
import adminRoutes from "./admin";
import userRoutes from "./user";
import storeRoute from "./store";

const isAdmin = [authGaurd, adminGaurd]; //ADMIN MIDDLEWARE

app.use("/user", authGaurd, userRoutes);
app.use("/admin", isAdmin, adminRoutes);
app.use("/auth", authRoutes);
app.use("/", storeRoute);

export default app;
