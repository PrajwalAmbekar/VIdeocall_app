import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { addFriend, getMyFriends, getRecommendedUsers } from '../controller/user.controller.js';

const router = express.Router();

router.use(protectRoute);

router.get('/',getRecommendedUsers);
router.get('/myFriends', getMyFriends);

router.post('/addFriend/:id', addFriend);

export default router;