import { Request, Response } from 'express';
import userService from '../../services/userService';
class UserController {
  async fetchUser(req: Request, res: Response) {
    return userService.fetchUser(req, res);
  }
}

export default new UserController();
