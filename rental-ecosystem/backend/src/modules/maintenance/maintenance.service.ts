import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

@Injectable()
export class MaintenanceService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMaintenanceDto, tenantId: string) {
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

  async findAll(propertyId: string) {
    return this.prisma.maintenanceRequest.findMany({
      where: { propertyId },
      include: {
        tenant: { select: { id: true, fullName: true, phoneNumber: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, dto: UpdateMaintenanceDto) {
    const request = await this.prisma.maintenanceRequest.findUnique({
      where: { id },
    });
    if (!request) {
      throw new NotFoundException('Maintenance request not found');
    }
    return this.prisma.maintenanceRequest.update({
      where: { id },
      data: { status: dto.status },
    });
  }
}