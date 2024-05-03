import { Router } from 'express';
import authGaurd from '../middlewares/auth';
import adminGaurd from '../middlewares/admin';

const app = Router();

import authRoutes from './auth';
import adminRoutes from './admin';
import userRoutes from './user';

const isAdmin = [authGaurd, adminGaurd]; //ADMIN MIDDLEWARE

app.use('/user', userRoutes);
app.use('/admin', authGaurd, adminGaurd, adminRoutes);
app.use('/auth', authRoutes);

export default app;
