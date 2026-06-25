import { Controller, Get, Post, Param, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('users/:id/verify')
  async verifyUser(@Param('id') userId: string, @CurrentUser('id') adminId: string) {
    return this.adminService.verifyUser(userId, adminId);
  }

  @Post('users/:id/suspend')
  async suspendUser(@Param('id') userId: string, @CurrentUser('id') adminId: string) {
    return this.adminService.suspendUser(userId, adminId);
  }

  @Post('users/:id/reactivate')
  async reactivateUser(@Param('id') userId: string, @CurrentUser('id') adminId: string) {
    return this.adminService.reactivateUser(userId, adminId);
  }

  @Get('audit-logs')
  async getAuditLogs(@Query('page') page = 1, @Query('limit') limit = 20) {
    return this.adminService.getAuditLogs(+page, +limit);
  }

  @Get('users')
  async getUsers(@Query('page') page = 1, @Query('limit') limit = 20) {
    return this.adminService.getUsers(+page, +limit);
  }

  @Get('dashboard')
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }
}