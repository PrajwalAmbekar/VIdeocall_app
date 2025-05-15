import { User } from "../model/auth.model.js";

export const getRecommendedUsers = async (req, res) => {
    const userId = req.user._id;
    const currentUser = req.user;
    try {
        const recommendedUsers = await User.find({
            $and :[
                {_id:{$ne: userId}},
                {$id: {$nin: currentUser.friends}},
                {isOnBoarded: true},
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
