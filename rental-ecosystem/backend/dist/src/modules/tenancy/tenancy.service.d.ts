import { PrismaService } from '../../../prisma/prisma.service';
export declare class TenancyService {
    private prisma;
    constructor(prisma: PrismaService);
    getMyHome(tenantId: string): Promise<{
        property: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.TenancyStatus;
        propertyId: string;
        tenantId: string;
        moveInDate: Date;
        moveOutDate: Date | null;
        rentAmountSnapshot: import("@prisma/client/runtime/library").Decimal;
    }>;
    requestMoveOut(tenantId: string): Promise<{
        message: string;
        tenancyId: string;
    }>;
    closeTenancy(id: string, userId: string): Promise<{
        message: string;
    }>;
}
