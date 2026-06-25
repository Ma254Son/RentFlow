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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../../../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(dto) {
        const existingPhone = await this.prisma.user.findUnique({
            where: { phoneNumber: dto.phoneNumber },
        });
        if (existingPhone) {
            throw new common_1.ConflictException('Phone number already registered');
        }
        if (dto.email) {
            const existingEmail = await this.prisma.user.findUnique({
                where: { email: dto.email },
            });
            if (existingEmail) {
                throw new common_1.ConflictException('Email already registered');
            }
        }
        const saltRounds = this.configService.get('bcrypt.saltRounds', 10);
        const passwordHash = await bcrypt.hash(dto.password, saltRounds);
        const user = await this.prisma.user.create({
            data: {
                fullName: dto.fullName,
                phoneNumber: dto.phoneNumber,
                email: dto.email,
                passwordHash,
                role: dto.role,
            },
            select: {
                id: true,
                fullName: true,
                phoneNumber: true,
                email: true,
                role: true,
                isVerified: true,
                kycStatus: true,
                createdAt: true,
            },
        });
        const otpCode = this.generateOtp();
        const otpExpiresAt = new Date(Date.now() + this.configService.get('otp.expiresInMinutes', 5) * 60 * 1000);
        console.log(`OTP for ${dto.phoneNumber}: ${otpCode}`);
        await this.prisma.auditLog.create({
            data: {
                userId: user.id,
                actionType: 'user_registered',
                entityType: 'user',
                entityId: user.id,
                metadata: { role: dto.role },
            },
        });
        return {
            message: 'Registration successful. Please verify your phone number.',
            user,
            otp: otpCode,
            otpExpiresAt,
        };
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { phoneNumber: dto.phoneNumber },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid phone number or password');
        }
        if (user.isSuspended) {
            throw new common_1.UnauthorizedException('Account is suspended');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid phone number or password');
        }
        const tokens = await this.generateTokens(user.id, user.role);
        await this.prisma.auditLog.create({
            data: {
                userId: user.id,
                actionType: 'user_login',
                entityType: 'user',
                entityId: user.id,
            },
        });
        return {
            ...tokens,
            user: {
                id: user.id,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
                kycStatus: user.kycStatus,
            },
        };
    }
    async verifyPhone(dto) {
        const user = await this.prisma.user.findUnique({
            where: { phoneNumber: dto.phoneNumber },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        if (user.isVerified) {
            throw new common_1.BadRequestException('Phone already verified');
        }
        if (dto.otpCode.length !== 6) {
            throw new common_1.BadRequestException('Invalid OTP code');
        }
        await this.prisma.user.update({
            where: { id: user.id },
            data: { isVerified: true },
        });
        await this.prisma.auditLog.create({
            data: {
                userId: user.id,
                actionType: 'phone_verified',
                entityType: 'user',
                entityId: user.id,
            },
        });
        return { message: 'Phone number verified successfully' };
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                fullName: true,
                phoneNumber: true,
                email: true,
                role: true,
                isVerified: true,
                kycStatus: true,
                profilePhoto: true,
                createdAt: true,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return user;
    }
    async generateTokens(userId, role) {
        const payload = { sub: userId, role };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.get('jwt.expiresIn', '15m'),
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.get('jwt.refreshExpiresIn', '7d'),
        });
        return { accessToken, refreshToken };
    }
    generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map