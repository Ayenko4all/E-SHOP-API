import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";

const app = Router();

import UserRoutes from "./user";
import AuthRoutes from "./auth";

app.use("/user", authMiddleware, UserRoutes);
app.use("/auth", AuthRoutes);

export default app;
