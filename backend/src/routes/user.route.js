import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(protectRoute);

router.get('/',getRecommendedUsers);
router.get('/myFriends', getMyFriends);