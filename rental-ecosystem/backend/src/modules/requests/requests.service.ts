import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class RequestsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRequestDto, tenantId: string) {
    // Find property by Home ID
    const property = await this.prisma.property.findUnique({
      where: { homeId: dto.homeId },
    });

    if (!property) {
      throw new NotFoundException('Property not found with this Home ID');
    }

    // Check property is available
    if (property.status !== 'vacant' && property.status !== 'reserved') {
      throw new BadRequestException('Property is not available');
    }

    // Check if tenant already has an active tenancy
    const existingTenancy = await this.prisma.tenancy.findFirst({
      where: { tenantId, status: 'active' },
    });

    if (existingTenancy) {
      throw new BadRequestException('Tenant already has an active tenancy. One active home per tenant.');
    }

    // Check for existing pending request
    const existingRequest = await this.prisma.homeConnectionRequest.findFirst({
      where: {
        tenantId,
        propertyId: property.id,
        status: 'pending',
      },
    });

    if (existingRequest) {
      throw new BadRequestException('A pending request already exists for this property');
    }

    const request = await this.prisma.homeConnectionRequest.create({
      data: {
        propertyId: property.id,
        tenantId,
      },
      include: {
        property: {
          select: { title: true, homeId: true, location: true },
        },
      },
    });

    // Audit log
    await this.prisma.auditLog.create({
      data: {
        userId: tenantId,
        actionType: 'home_connection_requested',
        entityType: 'request',
        entityId: request.id,
        metadata: { propertyId: property.id, homeId: dto.homeId },
      },
    });

    return request;
  }

  async getPendingRequests(userId: string) {
    return this.prisma.homeConnectionRequest.findMany({
      where: {
        property: {
          OR: [
            { ownerId: userId },
            { agentId: userId },
          ],
        },
        status: 'pending',
      },
      include: {
        tenant: {
          select: { id: true, fullName: true, phoneNumber: true, email: true },
        },
        property: {
          select: { id: true, title: true, homeId: true, location: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async approve(id: string, userId: string) {
    const request = await this.prisma.homeConnectionRequest.findUnique({
      where: { id },
      include: { property: true },
    });

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    if (request.property.ownerId !== userId && request.property.agentId !== userId) {
      throw new ForbiddenException('Not authorized to approve this request');
    }

    if (request.status !== 'pending') {
      throw new BadRequestException('Request is no longer pending');
    }

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.prisma.homeConnectionRequest.update({
      where: { id },
      data: {
        status: 'approved',
        otpCode,
        otpExpiresAt,
      },
    });

    // In production, send OTP via SMS
    console.log(`OTP for tenant ${request.tenantId}: ${otpCode}`);

    // Audit log
    await this.prisma.auditLog.create({
      data: {
        userId,
        actionType: 'home_request_approved',
        entityType: 'request',
        entityId: id,
        metadata: { propertyId: request.propertyId, tenantId: request.tenantId },
      },
    });

    return {
      message: 'Request approved. OTP sent to tenant.',
      otpExpiresAt,
    };
  }

  async reject(id: string, userId: string) {
    const request = await this.prisma.homeConnectionRequest.findUnique({
      where: { id },
      include: { property: true },
    });

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    if (request.property.ownerId !== userId && request.property.agentId !== userId) {
      throw new ForbiddenException('Not authorized to reject this request');
    }

    if (request.status !== 'pending') {
      throw new BadRequestException('Request is no longer pending');
    }

    await this.prisma.homeConnectionRequest.update({
      where: { id },
      data: { status: 'rejected' },
    });

    // Audit log
    await this.prisma.auditLog.create({
      data: {
        userId,
        actionType: 'home_request_rejected',
        entityType: 'request',
        entityId: id,
        metadata: { propertyId: request.propertyId, tenantId: request.tenantId },
      },
    });

    return { message: 'Request rejected' };
  }

  async verifyOtp(id: string, tenantId: string, dto: VerifyOtpDto) {
    const request = await this.prisma.homeConnectionRequest.findUnique({
      where: { id },
      include: { property: true },
    });

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    if (request.tenantId !== tenantId) {
      throw new ForbiddenException('Not authorized to verify this request');
    }

    if (request.status !== 'approved') {
      throw new BadRequestException('Request has not been approved');
    }

    if (!request.otpCode || !request.otpExpiresAt) {
      throw new BadRequestException('OTP not generated');
    }

    if (new Date() > request.otpExpiresAt) {
      await this.prisma.homeConnectionRequest.update({
        where: { id },
        data: { status: 'expired' },
      });
      throw new BadRequestException('OTP has expired');
    }

    if (dto.otpCode !== request.otpCode) {
      throw new BadRequestException('Invalid OTP code');
    }

    // Mark request as verified
    await this.prisma.homeConnectionRequest.update({
      where: { id },
      data: { status: 'verified' },
    });

    // Create active tenancy
    const tenancy = await this.prisma.tenancy.create({
      data: {
        propertyId: request.propertyId,
        tenantId,
        moveInDate: new Date(),
        rentAmountSnapshot: request.property.rentAmount,
      },
    });

    // Update property status to occupied
    await this.prisma.property.update({
      where: { id: request.propertyId },
      data: { status: 'occupied' },
    });

    // Audit log
    await this.prisma.auditLog.create({
      data: {
        userId: tenantId,
        actionType: 'otp_verified_tenancy_created',
        entityType: 'tenancy',
        entityId: tenancy.id,
        metadata: { propertyId: request.propertyId, requestId: id },
      },
    });

    return {
      message: 'Home connection successful! Tenancy created.',
      tenancy,
    };
  }
}