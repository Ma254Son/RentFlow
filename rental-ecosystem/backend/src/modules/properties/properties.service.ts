import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { QueryPropertyDto } from './dto/query-property.dto';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePropertyDto, ownerId: string, agentId?: string) {
    const property = await this.prisma.property.create({
      data: {
        title: dto.title,
        description: dto.description,
        location: dto.location,
        rentAmount: dto.rentAmount,
        bedrooms: dto.bedrooms,
        bathrooms: dto.bathrooms,
        amenities: dto.amenities || [],
        ownerId,
        agentId,
      },
      include: {
        owner: {
          select: { id: true, fullName: true, phoneNumber: true },
        },
        agent: {
          select: { id: true, fullName: true, phoneNumber: true },
        },
      },
    });

    // Audit log
    await this.prisma.auditLog.create({
      data: {
        userId: ownerId,
        actionType: 'property_created',
        entityType: 'property',
        entityId: property.id,
        metadata: { title: dto.title },
      },
    });

    return property;
  }

  async findAll(query: QueryPropertyDto) {
    const where: any = {};

    if (query.location) {
      where.location = { contains: query.location, mode: 'insensitive' };
    }
    if (query.rentMin !== undefined) {
      where.rentAmount = { ...where.rentAmount, gte: query.rentMin };
    }
    if (query.rentMax !== undefined) {
      where.rentAmount = { ...where.rentAmount, lte: query.rentMax };
    }
    if (query.bedrooms !== undefined) {
      where.bedrooms = query.bedrooms;
    }
    if (query.status) {
      where.status = query.status;
    }

    return this.prisma.property.findMany({
      where,
      include: {
        media: true,
        owner: {
          select: { id: true, fullName: true, phoneNumber: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: {
        media: true,
        owner: {
          select: { id: true, fullName: true, phoneNumber: true },
        },
        agent: {
          select: { id: true, fullName: true, phoneNumber: true },
        },
      },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return property;
  }

  async generateHomeId(id: string, userId: string) {
    const property = await this.prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (property.ownerId !== userId && property.agentId !== userId) {
      throw new ForbiddenException('Not authorized to generate Home ID for this property');
    }

    // Generate unique Home ID (format: RF-XXXX-XXXX)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const segment1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const segment2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const homeId = `RF-${segment1}-${segment2}`;

    await this.prisma.property.update({
      where: { id },
      data: { homeId },
    });

    // Audit log
    await this.prisma.auditLog.create({
      data: {
        userId,
        actionType: 'home_id_generated',
        entityType: 'property',
        entityId: id,
        metadata: { homeId },
      },
    });

    return { homeId };
  }

  async addMedia(propertyId: string, mediaType: 'image' | 'video', url: string) {
    return this.prisma.propertyMedia.create({
      data: {
        propertyId,
        mediaType,
        url,
      },
    });
  }

  async findMyProperties(userId: string, role: string) {
    if (role === 'agent') {
      return this.prisma.property.findMany({
        where: { agentId: userId },
        include: { media: true },
        orderBy: { createdAt: 'desc' },
      });
    }

    return this.prisma.property.findMany({
      where: { ownerId: userId },
      include: { media: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}