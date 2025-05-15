import { generateStreamToken } from "../lib/stream.js";

export const getStreamToken = async (req, res) => {
    try {
        const token=await generateStreamToken(req.user._id);
        if (!token) {
            return res.status(404).json({
                message: 'Token not found',
            });
        }
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error generating stream token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        
    }    
}