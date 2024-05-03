import { Router } from 'express';
import UserController from '../controllers/user/userController';
const router = Router();

router.get('/', UserController.fetchUser);

export default router;
