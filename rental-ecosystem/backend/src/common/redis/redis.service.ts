import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redis from 'redis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private client: redis.RedisClientType | null = null;
  private readonly logger = new Logger(RedisService.name);
  private isConnected = false;

  constructor(private configService: ConfigService) {
    this.connect();
  }

  private async connect() {
    try {
      const host = this.configService.get<string>('redis.host', 'localhost');
      const port = this.configService.get<number>('redis.port', 6379);
      const password = this.configService.get<string>('redis.password');

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
    } catch (error) {
      this.logger.warn(`Failed to connect to Redis: ${(error as Error).message}. Running without cache.`);
      this.isConnected = false;
    }
  }

  async onModuleDestroy() {
    if (this.client && this.isConnected) {
      await this.client.quit();
    }
  }

  // OTP Operations
  async setOtp(phoneNumber: string, otp: string): Promise<void> {
    if (!this.isConnected || !this.client) return;
    const ttl = this.configService.get<number>('redis.ttl', 300);
    await this.client.setEx(`otp:${phoneNumber}`, ttl, otp);
  }

  async getOtp(phoneNumber: string): Promise<string | null> {
    if (!this.isConnected || !this.client) return null;
    return this.client.get(`otp:${phoneNumber}`);
  }

  async deleteOtp(phoneNumber: string): Promise<void> {
    if (!this.isConnected || !this.client) return;
    await this.client.del(`otp:${phoneNumber}`);
  }

  // Session / Blacklist
  async blacklistToken(token: string, expiresIn: number): Promise<void> {
    if (!this.isConnected || !this.client) return;
    await this.client.setEx(`bl:${token}`, expiresIn, '1');
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    if (!this.isConnected || !this.client) return false;
    const result = await this.client.get(`bl:${token}`);
    return result === '1';
  }

  // Rate Limiting
  async incrementAndGet(key: string, windowSeconds: number): Promise<number> {
    if (!this.isConnected || !this.client) return 0;
    const fullKey = `rl:${key}`;
    const current = await this.client.incr(fullKey);
    if (current === 1) {
      await this.client.expire(fullKey, windowSeconds);
    }
    return current;
  }

  // Generic Cache
  async get(key: string): Promise<string | null> {
    if (!this.isConnected || !this.client) return null;
    return this.client.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (!this.isConnected || !this.client) return;
    if (ttl) {
      await this.client.setEx(key, ttl, value);
    } else {
      await this.client.set(key, value);
    }
  }

  async delete(key: string): Promise<void> {
    if (!this.isConnected || !this.client) return;
    await this.client.del(key);
  }

  get connected(): boolean {
    return this.isConnected;
  }
}