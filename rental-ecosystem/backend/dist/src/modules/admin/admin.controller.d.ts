import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    verifyUser(userId: string, adminId: string): Promise<{
        message: string;
    }>;
    suspendUser(userId: string, adminId: string): Promise<{
        message: string;
    }>;
    reactivateUser(userId: string, adminId: string): Promise<{
        message: string;
    }>;
    getAuditLogs(page?: number, limit?: number): Promise<{
        data: ({
            user: {
                fullName: string;
                role: import(".prisma/client").$Enums.UserRole;
                id: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            actionType: string;
            entityType: string;
            entityId: string | null;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            userId: string | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getUsers(page?: number, limit?: number): Promise<{
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
    getDashboardStats(): Promise<{
        totalUsers: number;
        totalProperties: number;
        activeTenancies: number;
        pendingVerifications: number;
        suspendedUsers: number;
    }>;
}
