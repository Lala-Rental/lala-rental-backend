import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

/**
 * Get user info from Google using the access token
 * @param {string} accessToken - Google OAuth access token
 * @returns {Promise<{name: string, email: string, picture: string}>} - User profile
 */
export async function getUserInfo(accessToken: string): Promise<{name: string, email: string, picture: string}> {
    try {
        const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const { name, email, picture } = response.data;
        return { name, email, picture };
    } catch (err) {
        console.error("Error fetching user info:", err);
        throw new Error("Failed to fetch Google user info.");
    }
}
