import { Strategy } from 'passport-jwt';
import { PrismaService } from '../../../prisma/prisma.service';
interface JwtPayload {
    sub: string;
    role: string;
    iat?: number;
    exp?: number;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: JwtPayload): Promise<{
        fullName: string;
        phoneNumber: string;
        email: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        isVerified: boolean;
        kycStatus: import(".prisma/client").$Enums.KycStatus;
        isSuspended: boolean;
    }>;
}
export {};
