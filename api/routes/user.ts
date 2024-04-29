import { Router } from "express";
import UserController from "../controllers/userController";
const router = Router();

router.get("/", UserController.fetchUser);

export default router;
