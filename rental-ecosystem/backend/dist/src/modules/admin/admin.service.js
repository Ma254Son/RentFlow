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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let AdminService = class AdminService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async verifyUser(userId, adminId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.kycStatus === 'approved')
            throw new common_1.BadRequestException('User already verified');
        await this.prisma.user.update({
            where: { id: userId },
            data: { kycStatus: 'approved' },
        });
        await this.prisma.auditLog.create({
            data: {
                userId: adminId,
                actionType: 'user_verified_kyc',
                entityType: 'user',
                entityId: userId,
                metadata: { targetRole: user.role },
            },
        });
        return { message: 'User verified successfully' };
    }
    async suspendUser(userId, adminId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        await this.prisma.user.update({
            where: { id: userId },
            data: { isSuspended: true },
        });
        await this.prisma.auditLog.create({
            data: {
                userId: adminId,
                actionType: 'user_suspended',
                entityType: 'user',
                entityId: userId,
            },
        });
        return { message: 'User suspended successfully' };
    }
    async reactivateUser(userId, adminId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        await this.prisma.user.update({
            where: { id: userId },
            data: { isSuspended: false },
        });
        await this.prisma.auditLog.create({
            data: {
                userId: adminId,
                actionType: 'user_reactivated',
                entityType: 'user',
                entityId: userId,
            },
        });
        return { message: 'User reactivated successfully' };
    }
    async getAuditLogs(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [logs, total] = await Promise.all([
            this.prisma.auditLog.findMany({
                skip,
                take: limit,
                include: {
                    user: { select: { id: true, fullName: true, role: true } },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.auditLog.count(),
        ]);
        return {
            data: logs,
            meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
        };
    }
    async getUsers(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                skip,
                take: limit,
                select: {
                    id: true,
                    fullName: true,
                    phoneNumber: true,
                    email: true,
                    role: true,
                    isVerified: true,
                    kycStatus: true,
                    isSuspended: true,
                    createdAt: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.user.count(),
        ]);
        return {
            data: users,
            meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
        };
    }
    async getDashboardStats() {
        const [totalUsers, totalProperties, totalTenancies, pendingVerifications, suspendedUsers,] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.property.count(),
            this.prisma.tenancy.count({ where: { status: 'active' } }),
            this.prisma.user.count({ where: { kycStatus: 'pending' } }),
            this.prisma.user.count({ where: { isSuspended: true } }),
        ]);
        return {
            totalUsers,
            totalProperties,
            activeTenancies: totalTenancies,
            pendingVerifications,
            suspendedUsers,
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map