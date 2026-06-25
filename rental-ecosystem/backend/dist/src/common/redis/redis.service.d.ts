import { OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class RedisService implements OnModuleDestroy {
    private configService;
    private client;
    private readonly logger;
    private isConnected;
    constructor(configService: ConfigService);
    private connect;
    onModuleDestroy(): Promise<void>;
    setOtp(phoneNumber: string, otp: string): Promise<void>;
    getOtp(phoneNumber: string): Promise<string | null>;
    deleteOtp(phoneNumber: string): Promise<void>;
    blacklistToken(token: string, expiresIn: number): Promise<void>;
    isTokenBlacklisted(token: string): Promise<boolean>;
    incrementAndGet(key: string, windowSeconds: number): Promise<number>;
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttl?: number): Promise<void>;
    delete(key: string): Promise<void>;
    get connected(): boolean;
}
