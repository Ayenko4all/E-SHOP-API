import { Router } from "express";

const app = Router();

import UserRoutes from "./user";
import AuthRoutes from "./auth";

app.use("/user", UserRoutes);
app.use("/auth", AuthRoutes);

export default app;
