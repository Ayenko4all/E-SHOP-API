import { Request, Response, NextFunction } from "express";
import authService from "../services/authService";

class UserController {
  register = async (req: Request, res: Response) => {
    authService.createUser(req, res);
  };

  login = async (req: Request, res: Response) => {
    authService.loginUser(req, res);
  };

  forgotPassword = async (req: Request, res: Response) => {
    authService.forgotPassword(req, res);
  };

  resetPassword = async (req: Request, res: Response) => {
    authService.resetPassword(req, res);
  };

  requestVerificationToken = async (req: Request, res: Response) => {
    authService.requestVerificationToken(req, res);
  };

  tokenVerification = async (req: Request, res: Response) => {
    authService.tokenVerification(req, res);
  };
}

export default new UserController();
