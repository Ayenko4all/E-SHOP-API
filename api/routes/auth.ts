import { Router } from "express";

import authController from "../controllers/authController";
import {
  loginError,
  tokenRequestError,
  registerError,
  resetPasswordError,
  verificationError,
} from "../validationHandler/authRequestValidator";

const router = Router();

router.post("/register", registerError, authController.register);
router.post("/login", loginError, authController.login);
router.post(
  "/forgotPassword",
  tokenRequestError,
  authController.forgotPassword
);
router.post("/resetPassord", resetPasswordError, authController.resetPassword);
router.post(
  "/requestToken",
  tokenRequestError,
  authController.requestVerificationToken
);
router.post(
  "/verifyToken",
  verificationError,
  authController.tokenVerification
);

export default router;
