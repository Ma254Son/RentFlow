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
exports.HomeIdService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let HomeIdService = class HomeIdService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generate(propertyId) {
        const property = await this.prisma.property.findUnique({
            where: { id: propertyId },
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        if (property.homeId) {
            throw new common_1.ConflictException('Property already has a Home ID assigned');
        }
        const homeId = this.generateHomeIdString();
        await this.prisma.property.update({
            where: { id: propertyId },
            data: { homeId },
        });
        return { homeId };
    }
    async lookup(homeId) {
        const property = await this.prisma.property.findUnique({
            where: { homeId },
            include: {
                media: true,
                owner: {
                    select: { id: true, fullName: true, phoneNumber: true },
                },
            },
        });
        if (!property) {
            throw new common_1.NotFoundException('No property found with this Home ID');
        }
        return property;
    }
    validate(homeId) {
        const pattern = /^RF-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
        return pattern.test(homeId);
    }
    async getPropertyByHomeId(homeId) {
        return this.lookup(homeId);
    }
    generateHomeIdString() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const segment = (length) => Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        return `RF-${segment(4)}-${segment(4)}`;
    }
};
exports.HomeIdService = HomeIdService;
exports.HomeIdService = HomeIdService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HomeIdService);
//# sourceMappingURL=home-id.service.js.map