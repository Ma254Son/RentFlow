"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const redis = require("redis");
let RedisService = RedisService_1 = class RedisService {
    constructor(configService) {
        this.configService = configService;
        this.client = null;
        this.logger = new common_1.Logger(RedisService_1.name);
        this.isConnected = false;
        this.connect();
    }
    async connect() {
        try {
            const host = this.configService.get('redis.host', 'localhost');
            const port = this.configService.get('redis.port', 6379);
            const password = this.configService.get('redis.password');
            const url = password
                ? `redis://:${password}@${host}:${port}`
                : `redis://${host}:${port}`;
            this.client = redis.createClient({ url });
            this.client.on('error', (err) => {
                this.logger.warn(`Redis connection error: ${err.message}. Running without cache.`);
                this.isConnected = false;
            });
            this.client.on('connect', () => {
                this.logger.log('Connected to Redis');
                this.isConnected = true;
            });
            await this.client.connect();
        }
        catch (error) {
            this.logger.warn(`Failed to connect to Redis: ${error.message}. Running without cache.`);
            this.isConnected = false;
        }
    }
    async onModuleDestroy() {
        if (this.client && this.isConnected) {
            await this.client.quit();
        }
    }
    async setOtp(phoneNumber, otp) {
        if (!this.isConnected || !this.client)
            return;
        const ttl = this.configService.get('redis.ttl', 300);
        await this.client.setEx(`otp:${phoneNumber}`, ttl, otp);
    }
    async getOtp(phoneNumber) {
        if (!this.isConnected || !this.client)
            return null;
        return this.client.get(`otp:${phoneNumber}`);
    }
    async deleteOtp(phoneNumber) {
        if (!this.isConnected || !this.client)
            return;
        await this.client.del(`otp:${phoneNumber}`);
    }
    async blacklistToken(token, expiresIn) {
        if (!this.isConnected || !this.client)
            return;
        await this.client.setEx(`bl:${token}`, expiresIn, '1');
    }
    async isTokenBlacklisted(token) {
        if (!this.isConnected || !this.client)
            return false;
        const result = await this.client.get(`bl:${token}`);
        return result === '1';
    }
    async incrementAndGet(key, windowSeconds) {
        if (!this.isConnected || !this.client)
            return 0;
        const fullKey = `rl:${key}`;
        const current = await this.client.incr(fullKey);
        if (current === 1) {
            await this.client.expire(fullKey, windowSeconds);
        }
        return current;
    }
    async get(key) {
        if (!this.isConnected || !this.client)
            return null;
        return this.client.get(key);
    }
    async set(key, value, ttl) {
        if (!this.isConnected || !this.client)
            return;
        if (ttl) {
            await this.client.setEx(key, ttl, value);
        }
        else {
            await this.client.set(key, value);
        }
    }
    async delete(key) {
        if (!this.isConnected || !this.client)
            return;
        await this.client.del(key);
    }
    get connected() {
        return this.isConnected;
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RedisService);
//# sourceMappingURL=redis.service.js.map