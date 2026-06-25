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
exports.RequestsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let RequestsService = class RequestsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, tenantId) {
        const property = await this.prisma.property.findUnique({
            where: { homeId: dto.homeId },
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found with this Home ID');
        }
        if (property.status !== 'vacant' && property.status !== 'reserved') {
            throw new common_1.BadRequestException('Property is not available');
        }
        const existingTenancy = await this.prisma.tenancy.findFirst({
            where: { tenantId, status: 'active' },
        });
        if (existingTenancy) {
            throw new common_1.BadRequestException('Tenant already has an active tenancy. One active home per tenant.');
        }
        const existingRequest = await this.prisma.homeConnectionRequest.findFirst({
            where: {
                tenantId,
                propertyId: property.id,
                status: 'pending',
            },
        });
        if (existingRequest) {
            throw new common_1.BadRequestException('A pending request already exists for this property');
        }
        const request = await this.prisma.homeConnectionRequest.create({
            data: {
                propertyId: property.id,
                tenantId,
            },
            include: {
                property: {
                    select: { title: true, homeId: true, location: true },
                },
            },
        });
        await this.prisma.auditLog.create({
            data: {
                userId: tenantId,
                actionType: 'home_connection_requested',
                entityType: 'request',
                entityId: request.id,
                metadata: { propertyId: property.id, homeId: dto.homeId },
            },
        });
        return request;
    }
    async getPendingRequests(userId) {
        return this.prisma.homeConnectionRequest.findMany({
            where: {
                property: {
                    OR: [
                        { ownerId: userId },
                        { agentId: userId },
                    ],
                },
                status: 'pending',
            },
            include: {
                tenant: {
                    select: { id: true, fullName: true, phoneNumber: true, email: true },
                },
                property: {
                    select: { id: true, title: true, homeId: true, location: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async approve(id, userId) {
        const request = await this.prisma.homeConnectionRequest.findUnique({
            where: { id },
            include: { property: true },
        });
        if (!request) {
            throw new common_1.NotFoundException('Request not found');
        }
        if (request.property.ownerId !== userId && request.property.agentId !== userId) {
            throw new common_1.ForbiddenException('Not authorized to approve this request');
        }
        if (request.status !== 'pending') {
            throw new common_1.BadRequestException('Request is no longer pending');
        }
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
        await this.prisma.homeConnectionRequest.update({
            where: { id },
            data: {
                status: 'approved',
                otpCode,
                otpExpiresAt,
            },
        });
        console.log(`OTP for tenant ${request.tenantId}: ${otpCode}`);
        await this.prisma.auditLog.create({
            data: {
                userId,
                actionType: 'home_request_approved',
                entityType: 'request',
                entityId: id,
                metadata: { propertyId: request.propertyId, tenantId: request.tenantId },
            },
        });
        return {
            message: 'Request approved. OTP sent to tenant.',
            otpExpiresAt,
        };
    }
    async reject(id, userId) {
        const request = await this.prisma.homeConnectionRequest.findUnique({
            where: { id },
            include: { property: true },
        });
        if (!request) {
            throw new common_1.NotFoundException('Request not found');
        }
        if (request.property.ownerId !== userId && request.property.agentId !== userId) {
            throw new common_1.ForbiddenException('Not authorized to reject this request');
        }
        if (request.status !== 'pending') {
            throw new common_1.BadRequestException('Request is no longer pending');
        }
        await this.prisma.homeConnectionRequest.update({
            where: { id },
            data: { status: 'rejected' },
        });
        await this.prisma.auditLog.create({
            data: {
                userId,
                actionType: 'home_request_rejected',
                entityType: 'request',
                entityId: id,
                metadata: { propertyId: request.propertyId, tenantId: request.tenantId },
            },
        });
        return { message: 'Request rejected' };
    }
    async verifyOtp(id, tenantId, dto) {
        const request = await this.prisma.homeConnectionRequest.findUnique({
            where: { id },
            include: { property: true },
        });
        if (!request) {
            throw new common_1.NotFoundException('Request not found');
        }
        if (request.tenantId !== tenantId) {
            throw new common_1.ForbiddenException('Not authorized to verify this request');
        }
        if (request.status !== 'approved') {
            throw new common_1.BadRequestException('Request has not been approved');
        }
        if (!request.otpCode || !request.otpExpiresAt) {
            throw new common_1.BadRequestException('OTP not generated');
        }
        if (new Date() > request.otpExpiresAt) {
            await this.prisma.homeConnectionRequest.update({
                where: { id },
                data: { status: 'expired' },
            });
            throw new common_1.BadRequestException('OTP has expired');
        }
        if (dto.otpCode !== request.otpCode) {
            throw new common_1.BadRequestException('Invalid OTP code');
        }
        await this.prisma.homeConnectionRequest.update({
            where: { id },
            data: { status: 'verified' },
        });
        const tenancy = await this.prisma.tenancy.create({
            data: {
                propertyId: request.propertyId,
                tenantId,
                moveInDate: new Date(),
                rentAmountSnapshot: request.property.rentAmount,
            },
        });
        await this.prisma.property.update({
            where: { id: request.propertyId },
            data: { status: 'occupied' },
        });
        await this.prisma.auditLog.create({
            data: {
                userId: tenantId,
                actionType: 'otp_verified_tenancy_created',
                entityType: 'tenancy',
                entityId: tenancy.id,
                metadata: { propertyId: request.propertyId, requestId: id },
            },
        });
        return {
            message: 'Home connection successful! Tenancy created.',
            tenancy,
        };
    }
};
exports.RequestsService = RequestsService;
exports.RequestsService = RequestsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RequestsService);
//# sourceMappingURL=requests.service.js.map