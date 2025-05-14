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