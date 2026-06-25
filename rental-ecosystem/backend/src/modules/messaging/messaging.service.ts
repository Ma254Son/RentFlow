import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class MessagingService {
  constructor(private prisma: PrismaService) {}

  async send(dto: SendMessageDto, senderId: string) {
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

  async getMessages(propertyId: string) {
    return this.prisma.message.findMany({
      where: { propertyId },
      include: {
        sender: { select: { id: true, fullName: true } },
        receiver: { select: { id: true, fullName: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getConversations(userId: string) {
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
}