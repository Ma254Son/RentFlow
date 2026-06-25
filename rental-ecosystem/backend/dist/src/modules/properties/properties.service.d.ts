import { PrismaService } from '../../../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { QueryPropertyDto } from './dto/query-property.dto';
export declare class PropertiesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePropertyDto, ownerId: string, agentId?: string): Promise<{
        agent: {
            fullName: string;
            phoneNumber: string;
            id: string;
        } | null;
        owner: {
            fullName: string;
            phoneNumber: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        location: string;
        rentAmount: import("@prisma/client/runtime/library").Decimal;
        bedrooms: number;
        bathrooms: number;
        amenities: import("@prisma/client/runtime/library").JsonValue;
        status: import(".prisma/client").$Enums.PropertyStatus;
        homeId: string | null;
        ownerId: string;
        agentId: string | null;
    }>;
    findAll(query: QueryPropertyDto): Promise<({
        owner: {
            fullName: string;
            phoneNumber: string;
            id: string;
        };
        media: {
            id: string;
            createdAt: Date;
            mediaType: import(".prisma/client").$Enums.MediaType;
            url: string;
            propertyId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        location: string;
        rentAmount: import("@prisma/client/runtime/library").Decimal;
        bedrooms: number;
        bathrooms: number;
        amenities: import("@prisma/client/runtime/library").JsonValue;
        status: import(".prisma/client").$Enums.PropertyStatus;
        homeId: string | null;
        ownerId: string;
        agentId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        agent: {
            fullName: string;
            phoneNumber: string;
            id: string;
        } | null;
        owner: {
            fullName: string;
            phoneNumber: string;
            id: string;
        };
        media: {
            id: string;
            createdAt: Date;
            mediaType: import(".prisma/client").$Enums.MediaType;
            url: string;
            propertyId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        location: string;
        rentAmount: import("@prisma/client/runtime/library").Decimal;
        bedrooms: number;
        bathrooms: number;
        amenities: import("@prisma/client/runtime/library").JsonValue;
        status: import(".prisma/client").$Enums.PropertyStatus;
        homeId: string | null;
        ownerId: string;
        agentId: string | null;
    }>;
    generateHomeId(id: string, userId: string): Promise<{
        homeId: string;
    }>;
    addMedia(propertyId: string, mediaType: 'image' | 'video', url: string): Promise<{
        id: string;
        createdAt: Date;
        mediaType: import(".prisma/client").$Enums.MediaType;
        url: string;
        propertyId: string;
    }>;
    findMyProperties(userId: string, role: string): Promise<({
        media: {
            id: string;
            createdAt: Date;
            mediaType: import(".prisma/client").$Enums.MediaType;
            url: string;
            propertyId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        location: string;
        rentAmount: import("@prisma/client/runtime/library").Decimal;
        bedrooms: number;
        bathrooms: number;
        amenities: import("@prisma/client/runtime/library").JsonValue;
        status: import(".prisma/client").$Enums.PropertyStatus;
        homeId: string | null;
        ownerId: string;
        agentId: string | null;
    })[]>;
}
