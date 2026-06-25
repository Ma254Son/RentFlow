import { Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { HomeIdService } from './home-id.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('home-id')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HomeIdController {
  constructor(private readonly homeIdService: HomeIdService) {}

  @Post('generate/:propertyId')
  @Roles('landlord', 'agent')
  async generate(@Param('propertyId') propertyId: string) {
    return this.homeIdService.generate(propertyId);
  }

  @Get('lookup/:homeId')
  async lookup(@Param('homeId') homeId: string) {
    return this.homeIdService.lookup(homeId);
  }

  @Get('validate/:homeId')
  async validate(@Param('homeId') homeId: string) {
    const isValid = this.homeIdService.validate(homeId);
    return { homeId, isValid };
  }
}