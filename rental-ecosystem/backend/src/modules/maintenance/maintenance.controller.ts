import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('maintenance')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  @Roles('tenant')
  async create(@Body() dto: CreateMaintenanceDto, @CurrentUser('id') tenantId: string) {
    return this.maintenanceService.create(dto, tenantId);
  }

  @Get()
  @Roles('tenant', 'landlord', 'agent')
  async findAll(@Query('property_id') propertyId: string) {
    return this.maintenanceService.findAll(propertyId);
  }

  @Patch(':id')
  @Roles('agent', 'landlord')
  async update(@Param('id') id: string, @Body() dto: UpdateMaintenanceDto) {
    return this.maintenanceService.update(id, dto);
  }
}