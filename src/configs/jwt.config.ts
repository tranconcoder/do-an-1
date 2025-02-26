import { JwtConfig } from "../api/types/jwt";

export default {
    accessToken: {
        options: {
            expiresIn: 15 * 60, // 15 minutes
            algorithm: "RS256",
        },
    },
    refreshToken: {
        options: {
            expiresIn: 1 * 24 * 60 * 60, // 1 day
            algorithm: "RS512",
        },
    }
} as JwtConfig;
