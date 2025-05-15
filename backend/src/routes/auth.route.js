import express from 'express';
import { signup, login, logout, onBoard } from '../controller/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/Signup', signup);
router.post('/Login', login);
router.post('/Logout', logout);
router.post('/Onboarding',protectRoute, onBoard);
router.get('/Protected', protectRoute, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed successfully',user: req.user });
});

export default router;


