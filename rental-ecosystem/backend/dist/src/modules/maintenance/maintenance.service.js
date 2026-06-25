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
exports.MaintenanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let MaintenanceService = class MaintenanceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, tenantId) {
        return this.prisma.maintenanceRequest.create({
            data: {
                propertyId: dto.propertyId,
                tenantId,
                title: dto.title,
                description: dto.description,
            },
            include: {
                property: { select: { title: true, homeId: true } },
            },
        });
    }
    async findAll(propertyId) {
        return this.prisma.maintenanceRequest.findMany({
            where: { propertyId },
            include: {
                tenant: { select: { id: true, fullName: true, phoneNumber: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async update(id, dto) {
        const request = await this.prisma.maintenanceRequest.findUnique({
            where: { id },
        });
        if (!request) {
            throw new common_1.NotFoundException('Maintenance request not found');
        }
        return this.prisma.maintenanceRequest.update({
            where: { id },
            data: { status: dto.status },
        });
    }
};
exports.MaintenanceService = MaintenanceService;
exports.MaintenanceService = MaintenanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MaintenanceService);
//# sourceMappingURL=maintenance.service.js.map