import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existingPhone = await this.prisma.user.findUnique({
      where: { phoneNumber: dto.phoneNumber },
    });
    if (existingPhone) {
      throw new ConflictException('Phone number already registered');
    }

    if (dto.email) {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (existingEmail) {
        throw new ConflictException('Email already registered');
      }
    }

    // ✅ ConfigService.get<T>() returns T instead of string | undefined
    const saltRounds = this.configService.get<number>('bcrypt.saltRounds', 10);
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
    const otpExpiresAt = new Date(
      Date.now() + this.configService.get<number>('otp.expiresInMinutes', 5) * 60 * 1000,
    );

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

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { phoneNumber: dto.phoneNumber },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid phone number or password');
    }

    if (user.isSuspended) {
      throw new UnauthorizedException('Account is suspended');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid phone number or password');
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

  async verifyPhone(dto: VerifyPhoneDto) {
    const user = await this.prisma.user.findUnique({
      where: { phoneNumber: dto.phoneNumber },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('Phone already verified');
    }

    if (dto.otpCode.length !== 6) {
      throw new BadRequestException('Invalid OTP code');
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

  async getProfile(userId: string) {
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
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  private async generateTokens(userId: string, role: string) {
    const payload = { sub: userId, role };

    const accessToken = this.jwtService.sign(payload, {
      // ✅ get<string>() with a default eliminates string | undefined
      expiresIn: this.configService.get<string>('jwt.expiresIn', '15m'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('jwt.refreshExpiresIn', '7d'),
    });

    return { accessToken, refreshToken };
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}