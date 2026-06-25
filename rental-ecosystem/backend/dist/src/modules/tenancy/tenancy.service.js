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
exports.TenancyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let TenancyService = class TenancyService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMyHome(tenantId) {
        const tenancy = await this.prisma.tenancy.findFirst({
            where: { tenantId, status: 'active' },
            include: {
                property: {
                    include: {
                        media: true,
                        owner: {
                            select: { id: true, fullName: true, phoneNumber: true },
                        },
                    },
                },
            },
        });
        if (!tenancy) {
            throw new common_1.NotFoundException('No active tenancy found');
        }
        return tenancy;
    }
    async requestMoveOut(tenantId) {
        const tenancy = await this.prisma.tenancy.findFirst({
            where: { tenantId, status: 'active' },
        });
        if (!tenancy) {
            throw new common_1.NotFoundException('No active tenancy found');
        }
        await this.prisma.auditLog.create({
            data: {
                userId: tenantId,
                actionType: 'move_out_requested',
                entityType: 'tenancy',
                entityId: tenancy.id,
            },
        });
        return { message: 'Move-out request submitted. Landlord/agent will process it.', tenancyId: tenancy.id };
    }
    async closeTenancy(id, userId) {
        const tenancy = await this.prisma.tenancy.findUnique({
            where: { id },
            include: { property: true },
        });
        if (!tenancy) {
            throw new common_1.NotFoundException('Tenancy not found');
        }
        if (tenancy.property.ownerId !== userId && tenancy.property.agentId !== userId) {
            throw new common_1.ForbiddenException('Not authorized to close this tenancy');
        }
        if (tenancy.status !== 'active') {
            throw new common_1.BadRequestException('Tenancy is not active');
        }
        await this.prisma.tenancy.update({
            where: { id },
            data: {
                status: 'ended',
                moveOutDate: new Date(),
            },
        });
        await this.prisma.property.update({
            where: { id: tenancy.propertyId },
            data: { status: 'vacant' },
        });
        await this.prisma.auditLog.create({
            data: {
                userId,
                actionType: 'tenancy_closed',
                entityType: 'tenancy',
                entityId: id,
                metadata: { propertyId: tenancy.propertyId, tenantId: tenancy.tenantId },
            },
        });
        return { message: 'Tenancy closed successfully. Property marked as vacant.' };
    }
};
exports.TenancyService = TenancyService;
exports.TenancyService = TenancyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TenancyService);
//# sourceMappingURL=tenancy.service.js.map