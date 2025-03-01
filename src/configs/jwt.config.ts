import { JwtConfig } from '../api/types/jwt';

export default {
    accessToken: {
        options: {
            expiresIn: '15 minutes', // 15 minutes
            algorithm: 'RS256'
        }
    },
    refreshToken: {
        options: {
            expiresIn: '1m', // 1 day
            algorithm: 'RS512'
        }
    }
} as JwtConfig;
