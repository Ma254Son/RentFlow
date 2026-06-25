import { PrismaService } from '../../../prisma/prisma.service';
import { SendMessageDto } from './dto/send-message.dto';
export declare class MessagingService {
    private prisma;
    constructor(prisma: PrismaService);
    send(dto: SendMessageDto, senderId: string): Promise<{
        sender: {
            fullName: string;
            id: string;
        };
        receiver: {
            fullName: string;
            id: string;
        };
    } & {
        message: string;
        id: string;
        createdAt: Date;
        propertyId: string | null;
        receiverId: string;
        senderId: string;
    }>;
    getMessages(propertyId: string): Promise<({
        sender: {
            fullName: string;
            id: string;
        };
        receiver: {
            fullName: string;
            id: string;
        };
    } & {
        message: string;
        id: string;
        createdAt: Date;
        propertyId: string | null;
        receiverId: string;
        senderId: string;
    })[]>;
    getConversations(userId: string): Promise<({
        sender: {
            fullName: string;
            id: string;
        };
        receiver: {
            fullName: string;
            id: string;
        };
    } & {
        message: string;
        id: string;
        createdAt: Date;
        propertyId: string | null;
        receiverId: string;
        senderId: string;
    })[]>;
}
