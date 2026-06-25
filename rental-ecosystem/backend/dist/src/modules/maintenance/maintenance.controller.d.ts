import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
export declare class MaintenanceController {
    private readonly maintenanceService;
    constructor(maintenanceService: MaintenanceService);
    create(dto: CreateMaintenanceDto, tenantId: string): Promise<{
        property: {
            title: string;
            homeId: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.MaintenanceStatus;
        propertyId: string;
        tenantId: string;
        priority: import(".prisma/client").$Enums.MaintenancePriority;
    }>;
    findAll(propertyId: string): Promise<({
        tenant: {
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
        status: import(".prisma/client").$Enums.MaintenanceStatus;
        propertyId: string;
        tenantId: string;
        priority: import(".prisma/client").$Enums.MaintenancePriority;
    })[]>;
    update(id: string, dto: UpdateMaintenanceDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.MaintenanceStatus;
        propertyId: string;
        tenantId: string;
        priority: import(".prisma/client").$Enums.MaintenancePriority;
    }>;
}
