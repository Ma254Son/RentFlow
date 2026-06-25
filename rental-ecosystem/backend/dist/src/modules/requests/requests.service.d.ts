import { PrismaService } from '../../../prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
export declare class RequestsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateRequestDto, tenantId: string): Promise<{
        property: {
            title: string;
            location: string;
            homeId: string | null;
        };
    } & {
        otpCode: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.RequestStatus;
        propertyId: string;
        tenantId: string;
        otpExpiresAt: Date | null;
    }>;
    getPendingRequests(userId: string): Promise<({
        property: {
            id: string;
            title: string;
            location: string;
            homeId: string | null;
        };
        tenant: {
            fullName: string;
            phoneNumber: string;
            email: string | null;
            id: string;
        };
    } & {
        otpCode: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.RequestStatus;
        propertyId: string;
        tenantId: string;
        otpExpiresAt: Date | null;
    })[]>;
    approve(id: string, userId: string): Promise<{
        message: string;
        otpExpiresAt: Date;
    }>;
    reject(id: string, userId: string): Promise<{
        message: string;
    }>;
    verifyOtp(id: string, tenantId: string, dto: VerifyOtpDto): Promise<{
        message: string;
        tenancy: {
            id: string;
            createdAt: Date;
            status: import(".prisma/client").$Enums.TenancyStatus;
            propertyId: string;
            tenantId: string;
            moveInDate: Date;
            moveOutDate: Date | null;
            rentAmountSnapshot: import("@prisma/client/runtime/library").Decimal;
        };
    }>;
}
