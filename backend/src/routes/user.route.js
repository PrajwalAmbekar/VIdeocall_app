import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { acceptFriendRequest, addFriend, getFriendRequests, getMyFriends, getOutgoingFriendRequests, getRecommendedUsers } from '../controller/user.controller.js';

const router = express.Router();

router.use(protectRoute);

router.get('/',getRecommendedUsers);
router.get('/myFriends', getMyFriends);

router.post('/addFriend/:id', addFriend);
router.put('/acceptFriendRequest/:id', acceptFriendRequest);
router.get('/getFriendRequests',getFriendRequests);
router.get('/outgoingFriendRequests',getOutgoingFriendRequests);



export default router;