import {StreamChat} from 'stream-chat';
import dotenv from 'dotenv';
dotenv.config();


const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

const serverClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertServerClient = async (userData) => {
    try {
        await serverClient.upsertUser(userData);
        return userData;
    } catch (error) {
        console.error('Error in upsertServerClient:', error);
        throw error;
        
    }
}

export const generateStreamToken = async (userId) => {
    try {
        const userIdStr = userId.toString();
        return token = serverClient.createToken(userIdStr);
        
    } catch (error) {
        console.error('Error generating stream token:', error);
        throw error;
        
    }
}