import { Router } from "express";

import AuthController from "../controllers/authController";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/forgotPassword", AuthController.forgotPassword);
router.post("/resetPassord", AuthController.resetPassword);
router.post("/requestToken", AuthController.requestVerificationToken);
router.post("/verifyToken", AuthController.tokenVerification);

export default router;
