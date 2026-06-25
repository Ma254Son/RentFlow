import { PrismaService } from '../../../prisma/prisma.service';
export declare class HomeIdService {
    private prisma;
    constructor(prisma: PrismaService);
    generate(propertyId: string): Promise<{
        homeId: string;
    }>;
    lookup(homeId: string): Promise<{
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
    validate(homeId: string): boolean;
    getPropertyByHomeId(homeId: string): Promise<{
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
    private generateHomeIdString;
}
