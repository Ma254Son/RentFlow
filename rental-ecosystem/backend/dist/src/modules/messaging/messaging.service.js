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
exports.MessagingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let MessagingService = class MessagingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async send(dto, senderId) {
        return this.prisma.message.create({
            data: {
                senderId,
                receiverId: dto.receiverId,
                propertyId: dto.propertyId,
                message: dto.message,
            },
            include: {
                sender: { select: { id: true, fullName: true } },
                receiver: { select: { id: true, fullName: true } },
            },
        });
    }
    async getMessages(propertyId) {
        return this.prisma.message.findMany({
            where: { propertyId },
            include: {
                sender: { select: { id: true, fullName: true } },
                receiver: { select: { id: true, fullName: true } },
            },
            orderBy: { createdAt: 'asc' },
        });
    }
    async getConversations(userId) {
        return this.prisma.message.findMany({
            where: {
                OR: [{ senderId: userId }, { receiverId: userId }],
            },
            include: {
                sender: { select: { id: true, fullName: true } },
                receiver: { select: { id: true, fullName: true } },
            },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
    }
};
exports.MessagingService = MessagingService;
exports.MessagingService = MessagingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessagingService);
//# sourceMappingURL=messaging.service.js.map