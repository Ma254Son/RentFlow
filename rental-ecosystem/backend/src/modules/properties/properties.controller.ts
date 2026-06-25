import {
  Controller, Get, Post, Body, Param, Query, UseGuards
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { QueryPropertyDto } from './dto/query-property.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('properties')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @Roles('landlord', 'agent')
  async create(@Body() dto: CreatePropertyDto, @CurrentUser() user: any) {
    const agentId = user.role === 'agent' ? user.id : undefined;
    return this.propertiesService.create(dto, user.id, agentId);
  }

  @Get()
  @Roles('tenant')
  async findAll(@Query() query: QueryPropertyDto) {
    return this.propertiesService.findAll(query);
  }

  @Get('my')
  async findMyProperties(@CurrentUser() user: any) {
    return this.propertiesService.findMyProperties(user.id, user.role);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(id);
  }

  @Post(':id/generate-home-id')
  @Roles('landlord', 'agent')
  async generateHomeId(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.propertiesService.generateHomeId(id, userId);
  }

  @Post(':id/media')
  @Roles('landlord', 'agent')
  async addMedia(
    @Param('id') id: string,
    @Body('mediaType') mediaType: 'image' | 'video',
    @Body('url') url: string,
  ) {
    return this.propertiesService.addMedia(id, mediaType, url);
  }
}