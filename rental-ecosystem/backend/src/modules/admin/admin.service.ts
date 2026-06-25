import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async verifyUser(userId: string, adminId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    if (user.kycStatus === 'approved') throw new BadRequestException('User already verified');

    await this.prisma.user.update({
      where: { id: userId },
      data: { kycStatus: 'approved' },
    });

    // Audit log
    await this.prisma.auditLog.create({
      data: {
        userId: adminId,
        actionType: 'user_verified_kyc',
        entityType: 'user',
        entityId: userId,
        metadata: { targetRole: user.role },
      },
    });

    return { message: 'User verified successfully' };
  }

  async suspendUser(userId: string, adminId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    await this.prisma.user.update({
      where: { id: userId },
      data: { isSuspended: true },
    });

    await this.prisma.auditLog.create({
      data: {
        userId: adminId,
        actionType: 'user_suspended',
        entityType: 'user',
        entityId: userId,
      },
    });

    return { message: 'User suspended successfully' };
  }

  async reactivateUser(userId: string, adminId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    await this.prisma.user.update({
      where: { id: userId },
      data: { isSuspended: false },
    });

    await this.prisma.auditLog.create({
      data: {
        userId: adminId,
        actionType: 'user_reactivated',
        entityType: 'user',
        entityId: userId,
      },
    });

    return { message: 'User reactivated successfully' };
  }

  async getAuditLogs(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [logs, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        skip,
        take: limit,
        include: {
          user: { select: { id: true, fullName: true, role: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.auditLog.count(),
    ]);

    return {
      data: logs,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getUsers(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          fullName: true,
          phoneNumber: true,
          email: true,
          role: true,
          isVerified: true,
          kycStatus: true,
          isSuspended: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count(),
    ]);

    return {
      data: users,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getDashboardStats() {
    const [
      totalUsers,
      totalProperties,
      totalTenancies,
      pendingVerifications,
      suspendedUsers,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.property.count(),
      this.prisma.tenancy.count({ where: { status: 'active' } }),
      this.prisma.user.count({ where: { kycStatus: 'pending' } }),
      this.prisma.user.count({ where: { isSuspended: true } }),
    ]);

    return {
      totalUsers,
      totalProperties,
      activeTenancies: totalTenancies,
      pendingVerifications,
      suspendedUsers,
    };
  }
}