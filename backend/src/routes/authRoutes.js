import express from 'express';
import { login, logout, onboard, signup, updateProfile } from '../controllers/authController.js';
import { authUser } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

// Define signup route

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

authRouter.post('/onboarding', authUser, onboard)
authRouter.put('/profile', authUser, updateProfile)
authRouter.get('/me', authUser, (req, res) => {
  res.status(200).json({ user: req.user });
})

export default authRouter;