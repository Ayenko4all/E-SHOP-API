import { Router } from "express";

import authController from "../controllers/user/authController";
import {
  loginValidator,
  tokenRequestValidator,
  registerValidator,
  resetPasswordValidator,
  verificationValidator,
} from "../validationHandler/authRequestValidator";

const router = Router();

router.post("/register", registerValidator, authController.register);
router.post("/login", loginValidator, authController.login);
router.post(
  "/forgotPassword",
  tokenRequestValidator,
  authController.forgotPassword
);
router.post(
  "/resetPassord",
  resetPasswordValidator,
  authController.resetPassword
);
router.post(
  "/requestToken",
  tokenRequestValidator,
  authController.requestVerificationToken
);
router.post(
  "/verifyToken",
  verificationValidator,
  authController.tokenVerification
);

export default router;
