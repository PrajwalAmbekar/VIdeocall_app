import { User } from "../model/auth.model.js";
import { FriendRequest } from "../model/friendRequest.model.js";

export const getRecommendedUsers = async (req, res) => {
    const userId = req.user._id;
    const currentUser = req.user;
    try {
        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: userId } },
                { $id: { $nin: currentUser.friends } },
                { isOnBoarded: true },
            ],
        })
        res.status(200).json({
            message: 'Recommended users fetched successfully',
            recommendedUsers: recommendedUsers,
        });



    } catch (error) {
        console.error('Error fetching recommended users:', error);
        res.status(500).send('Internal Server Error');

    }
}
export const getMyFriends = async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId)
            .select('friends')
            .populate('friends', 'username profilePic  nativeLanguage learningLanguage location');
        res.status(200).json({
            message: 'Friends fetched successfully',
            friends: user.friends,
        });
    } catch (error) {
        console.error('Error fetching friends:', error);
        res.status(500).send('Internal Server Error');
    }
}
export const addFriend = async (req, res) => {
    const userId = req.user._id;
    const { id: friendId } = req.params;
    try {
        if (userId === friendId) {
            return res.status(400).json({
                message: 'You cannot send a friend request to yourself',
            });
        }
        const recipient = await User.findById(friendId);
        if (!recipient) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        if (recipient.friends.includes(userId)) {
            return res.status(400).json({
                message: 'You are already friends with this user',
            });
        }
        const friendRequest = await FriendRequest.findOne({
            $or: [
                { senderId: userId, receiverId: friendId },
                { senderId: friendId, receiverId: userId },
            ],
        });
        if (friendRequest) {
            return res.status(400).json({
                message: 'Friend request already sent',
            });
        }
        const newFriendRequest = new FriendRequest.create({
            senderId: userId,
            receiverId: friendId,
        });
        await newFriendRequest.save();
        res.status(200).json({
            message: 'Friend request sent successfully',
            friendRequest: newFriendRequest,
        });
    } catch (error) {
        console.error('Error sending friend request:', error);
        res.status(500).send('Internal Server Error');
    }
}

export const acceptFriendRequest = async (req, res) => {
    const userId = req.user._id;
    const { id: friendRequestId } = req.params;
    try {
        const friendRequest = await FriendRequest.findById(friendRequestId);
        if (!friendRequest) {
            return res.status(404).json({
                message: 'Friend request not found',
            });
        }
        if (friendRequest.receiverId.toString() !== userId) {
            return res.status(403).json({
                message: 'You are not authorized to accept this friend request',
            });
        }
        friendRequest.status = 'accepted';
        await friendRequest.save();
        await User.findByIdAndUpdate(friendRequest.senderId, {
            $addToSet: { friends: userId },
        });
        await User.findByIdAndUpdate(userId, {
            $addToSet: { friends: friendRequest.senderId },
        });
        res.status(200).json({
            message: 'Friend request accepted successfully',
            friendRequest: friendRequest,
        });
    } catch (error) {
        console.error('Error accepting friend request:', error);
        res.status(500).send('Internal Server Error');
    }
}


export const getFriendRequests = async (req, res) => {
    try {
        const incomingFriendRequests = await FriendRequest.find({
            receiverId: req.user._id,
            status: 'pending',
        }).populate('senderId', 'username profilePic nativeLanguage learningLanguage location');
        const acceptedFriendRequests = await FriendRequest.find({
            receiverId: req.user._id,
            status: 'accepted',     
        }).populate('receiverId', 'username profilePic ');
        
        res.status(200).json({
            incomingFriendRequests,
            acceptedFriendRequests,
            message: 'Friend requests fetched successfully',
        });
    } catch (error) {
        console.error('Error fetching friend requests:', error);
        res.status(500).send('Internal Server Error');

    }
}
export const getOutgoingFriendRequests = async (req, res) => {
    try {
        const outgoingFriendRequests = await FriendRequest.find({
            senderId: req.user._id,
            status: 'pending',
        }).populate('receiverId', 'username profilePic nativeLanguage learningLanguage location');
        res.status(200).json({
            outgoingFriendRequests,
            message: 'Outgoing friend requests fetched successfully',
        });
    } catch (error) {
        console.error('Error fetching outgoing friend requests:', error);
        res.status(500).send('Internal Server Error');
    }
}
