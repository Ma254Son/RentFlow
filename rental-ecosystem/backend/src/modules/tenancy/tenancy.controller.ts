import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { TenancyService } from './tenancy.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('tenancy')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TenancyController {
  constructor(private readonly tenancyService: TenancyService) {}

  @Get('me')
  @Roles('tenant')
  async getMyHome(@CurrentUser('id') tenantId: string) {
    return this.tenancyService.getMyHome(tenantId);
  }

  @Post('move-out')
  @Roles('tenant')
  async requestMoveOut(@CurrentUser('id') tenantId: string) {
    return this.tenancyService.requestMoveOut(tenantId);
  }

  @Post(':id/close')
  @Roles('landlord', 'agent')
  async closeTenancy(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.tenancyService.closeTenancy(id, userId);
  }
}