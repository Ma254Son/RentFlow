import { AuditService } from './audit.service';
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    findAll(page?: number, limit?: number): Promise<{
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
    findByEntity(entityType: string, entityId: string, page?: number, limit?: number): Promise<{
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
    findByUser(userId: string, page?: number, limit?: number): Promise<{
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
    findByAction(actionType: string, page?: number, limit?: number): Promise<{
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
}
