import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    register(dto: RegisterDto): Promise<{
        message: string;
        user: {
            fullName: string;
            phoneNumber: string;
            email: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            id: string;
            isVerified: boolean;
            kycStatus: import(".prisma/client").$Enums.KycStatus;
            createdAt: Date;
        };
        otp: string;
        otpExpiresAt: Date;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: string;
            fullName: string;
            phoneNumber: string;
            email: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            isVerified: boolean;
            kycStatus: import(".prisma/client").$Enums.KycStatus;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    verifyPhone(dto: VerifyPhoneDto): Promise<{
        message: string;
    }>;
    getProfile(userId: string): Promise<{
        fullName: string;
        phoneNumber: string;
        email: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        isVerified: boolean;
        kycStatus: import(".prisma/client").$Enums.KycStatus;
        profilePhoto: string | null;
        createdAt: Date;
    }>;
    private generateTokens;
    private generateOtp;
}
