import { HomeIdService } from './home-id.service';
export declare class HomeIdController {
    private readonly homeIdService;
    constructor(homeIdService: HomeIdService);
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
    validate(homeId: string): Promise<{
        homeId: string;
        isValid: boolean;
    }>;
}
