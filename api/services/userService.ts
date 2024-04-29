import { Request, Response } from "express";
import api from "../controllers/apiController";
import { IUser } from "../models/userModel";

class UserService {
  public async fetchUser(req: Request, res: Response): Promise<Response> {
    const user: IUser = req.body.user;
    return api.respondCreated(res, { user: user }, "User fetch successfully.");
  }
}

export default new UserService();
