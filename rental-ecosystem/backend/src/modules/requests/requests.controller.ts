import {
  Controller, Get, Post, Body, Param, Query, UseGuards
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('home-requests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @Roles('tenant')
  async create(@Body() dto: CreateRequestDto, @CurrentUser('id') tenantId: string) {
    return this.requestsService.create(dto, tenantId);
  }

  @Get()
  @Roles('landlord', 'agent')
  async getPendingRequests(@CurrentUser('id') userId: string) {
    return this.requestsService.getPendingRequests(userId);
  }

  @Post(':id/approve')
  @Roles('landlord', 'agent')
  async approve(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.requestsService.approve(id, userId);
  }

  @Post(':id/reject')
  @Roles('landlord', 'agent')
  async reject(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.requestsService.reject(id, userId);
  }

  @Post(':id/verify')
  @Roles('tenant')
  async verifyOtp(
    @Param('id') id: string,
    @CurrentUser('id') tenantId: string,
    @Body() dto: VerifyOtpDto,
  ) {
    return this.requestsService.verifyOtp(id, tenantId, dto);
  }
}