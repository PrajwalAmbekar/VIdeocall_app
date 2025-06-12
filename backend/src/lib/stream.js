import { StreamChat } from "stream-chat";
import dotenv from "dotenv";
dotenv.config(); // <- VERY IMPORTANT

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error("Missing Stream credentials in .env");
}

// ✅ This is the server-side client
export const serverClient = StreamChat.getInstance(apiKey, apiSecret);

// Upsert user (for signup and onboarding)
export async function upsertStreamUser({ id, name, image }) {
  return await serverClient.upsertUsers([
    {
      id,
      name,
      image,
    },
  ]);
}

// Create token (for frontend auth)
export function generateStreamToken(userId) {
  return serverClient.createToken(userId);
}
