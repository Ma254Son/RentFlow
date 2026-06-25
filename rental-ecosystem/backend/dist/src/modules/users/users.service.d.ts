import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
export declare class UsersService {
    private prisma;
    private auditService;
    constructor(prisma: PrismaService, auditService: AuditService);
    findById(id: string): Promise<{
        fullName: string;
        phoneNumber: string;
        email: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        isVerified: boolean;
        kycStatus: import(".prisma/client").$Enums.KycStatus;
        profilePhoto: string | null;
        isSuspended: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile(id: string, data: {
        fullName?: string;
        email?: string;
        profilePhoto?: string;
    }): Promise<{
        fullName: string;
        phoneNumber: string;
        email: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        profilePhoto: string | null;
        updatedAt: Date;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            fullName: string;
            phoneNumber: string;
            email: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            id: string;
            isVerified: boolean;
            kycStatus: import(".prisma/client").$Enums.KycStatus;
            isSuspended: boolean;
            createdAt: Date;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findByRole(role: string, page?: number, limit?: number): Promise<{
        data: {
            fullName: string;
            phoneNumber: string;
            email: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            id: string;
            isVerified: boolean;
            kycStatus: import(".prisma/client").$Enums.KycStatus;
            createdAt: Date;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    search(query: string, page?: number, limit?: number): Promise<{
        data: {
            fullName: string;
            phoneNumber: string;
            email: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            id: string;
            isVerified: boolean;
            kycStatus: import(".prisma/client").$Enums.KycStatus;
            createdAt: Date;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
}
