import { Request, Response, NextFunction } from "express";
import userService from "../../services/userService";
class UserController {
  fetchUser = async (req: Request, res: Response) => {
    userService.fetchUser(req, res);
  };
}

export default new UserController();
