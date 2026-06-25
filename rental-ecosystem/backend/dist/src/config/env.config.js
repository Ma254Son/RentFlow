"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT ?? '3000', 10) || 3000,
    database: {
        url: process.env.DATABASE_URL,
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT ?? '6379', 10) || 6379,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'super-secret-key-change-in-production',
        expiresIn: process.env.JWT_EXPIRES_IN || '15m',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    },
    otp: {
        expiresInMinutes: parseInt(process.env.OTP_EXPIRES_IN_MINUTES ?? '5', 10) || 5,
    },
    bcrypt: {
        saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10) || 10,
    },
});
//# sourceMappingURL=env.config.js.map