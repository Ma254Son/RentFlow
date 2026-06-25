import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TenancyService {
  constructor(private prisma: PrismaService) {}

  async getMyHome(tenantId: string) {
    const tenancy = await this.prisma.tenancy.findFirst({
      where: { tenantId, status: 'active' },
      include: {
        property: {
          include: {
            media: true,
            owner: {
              select: { id: true, fullName: true, phoneNumber: true },
            },
          },
        },
      },
    });

    if (!tenancy) {
      throw new NotFoundException('No active tenancy found');
    }

    return tenancy;
  }

  async requestMoveOut(tenantId: string) {
    const tenancy = await this.prisma.tenancy.findFirst({
      where: { tenantId, status: 'active' },
    });

    if (!tenancy) {
      throw new NotFoundException('No active tenancy found');
    }

    // Audit log
    await this.prisma.auditLog.create({
      data: {
        userId: tenantId,
        actionType: 'move_out_requested',
        entityType: 'tenancy',
        entityId: tenancy.id,
      },
    });

    return { message: 'Move-out request submitted. Landlord/agent will process it.', tenancyId: tenancy.id };
  }

  async closeTenancy(id: string, userId: string) {
    const tenancy = await this.prisma.tenancy.findUnique({
      where: { id },
      include: { property: true },
    });

    if (!tenancy) {
      throw new NotFoundException('Tenancy not found');
    }

    if (tenancy.property.ownerId !== userId && tenancy.property.agentId !== userId) {
      throw new ForbiddenException('Not authorized to close this tenancy');
    }

    if (tenancy.status !== 'active') {
      throw new BadRequestException('Tenancy is not active');
    }

    await this.prisma.tenancy.update({
      where: { id },
      data: {
        status: 'ended',
        moveOutDate: new Date(),
      },
    });

    // Mark property as vacant
    await this.prisma.property.update({
      where: { id: tenancy.propertyId },
      data: { status: 'vacant' },
    });

    // Audit log
    await this.prisma.auditLog.create({
      data: {
        userId,
        actionType: 'tenancy_closed',
        entityType: 'tenancy',
        entityId: id,
        metadata: { propertyId: tenancy.propertyId, tenantId: tenancy.tenantId },
      },
    });

    return { message: 'Tenancy closed successfully. Property marked as vacant.' };
  }
}