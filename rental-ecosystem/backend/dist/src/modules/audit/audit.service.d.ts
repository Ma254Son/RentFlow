import { PrismaService } from '../../../prisma/prisma.service';
export interface AuditEntry {
    userId?: string;
    actionType: string;
    entityType: string;
    entityId?: string;
    metadata?: Record<string, any>;
}
export declare class AuditService {
    private prisma;
    constructor(prisma: PrismaService);
    log(entry: AuditEntry): Promise<void>;
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
