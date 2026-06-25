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
exports.PropertiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let PropertiesService = class PropertiesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, ownerId, agentId) {
        const property = await this.prisma.property.create({
            data: {
                title: dto.title,
                description: dto.description,
                location: dto.location,
                rentAmount: dto.rentAmount,
                bedrooms: dto.bedrooms,
                bathrooms: dto.bathrooms,
                amenities: dto.amenities || [],
                ownerId,
                agentId,
            },
            include: {
                owner: {
                    select: { id: true, fullName: true, phoneNumber: true },
                },
                agent: {
                    select: { id: true, fullName: true, phoneNumber: true },
                },
            },
        });
        await this.prisma.auditLog.create({
            data: {
                userId: ownerId,
                actionType: 'property_created',
                entityType: 'property',
                entityId: property.id,
                metadata: { title: dto.title },
            },
        });
        return property;
    }
    async findAll(query) {
        const where = {};
        if (query.location) {
            where.location = { contains: query.location, mode: 'insensitive' };
        }
        if (query.rentMin !== undefined) {
            where.rentAmount = { ...where.rentAmount, gte: query.rentMin };
        }
        if (query.rentMax !== undefined) {
            where.rentAmount = { ...where.rentAmount, lte: query.rentMax };
        }
        if (query.bedrooms !== undefined) {
            where.bedrooms = query.bedrooms;
        }
        if (query.status) {
            where.status = query.status;
        }
        return this.prisma.property.findMany({
            where,
            include: {
                media: true,
                owner: {
                    select: { id: true, fullName: true, phoneNumber: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const property = await this.prisma.property.findUnique({
            where: { id },
            include: {
                media: true,
                owner: {
                    select: { id: true, fullName: true, phoneNumber: true },
                },
                agent: {
                    select: { id: true, fullName: true, phoneNumber: true },
                },
            },
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        return property;
    }
    async generateHomeId(id, userId) {
        const property = await this.prisma.property.findUnique({
            where: { id },
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        if (property.ownerId !== userId && property.agentId !== userId) {
            throw new common_1.ForbiddenException('Not authorized to generate Home ID for this property');
        }
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const segment1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        const segment2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        const homeId = `RF-${segment1}-${segment2}`;
        await this.prisma.property.update({
            where: { id },
            data: { homeId },
        });
        await this.prisma.auditLog.create({
            data: {
                userId,
                actionType: 'home_id_generated',
                entityType: 'property',
                entityId: id,
                metadata: { homeId },
            },
        });
        return { homeId };
    }
    async addMedia(propertyId, mediaType, url) {
        return this.prisma.propertyMedia.create({
            data: {
                propertyId,
                mediaType,
                url,
            },
        });
    }
    async findMyProperties(userId, role) {
        if (role === 'agent') {
            return this.prisma.property.findMany({
                where: { agentId: userId },
                include: { media: true },
                orderBy: { createdAt: 'desc' },
            });
        }
        return this.prisma.property.findMany({
            where: { ownerId: userId },
            include: { media: true },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.PropertiesService = PropertiesService;
exports.PropertiesService = PropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PropertiesService);
//# sourceMappingURL=properties.service.js.map