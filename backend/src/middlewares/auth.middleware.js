import jwt from 'jsonwebtoken';
import {User} from '../model/auth.model.js';

export const protectRoute = async (req, res, next) => {
    const token =req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, no token provided' });
    }
    try {
        const decoded =jwt.verify(token, process.env.JWT_SECRET);
         if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized, invalid token' });    
        }
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized, user not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Error during token verification:', error);
        res.status(500).send('Internal Server Error');  
    }

}