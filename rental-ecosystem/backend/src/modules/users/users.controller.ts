import {
  Controller, Get, Patch, Body, Param, Query, UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getProfile(@CurrentUser('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch('me')
  async updateProfile(
    @CurrentUser('id') id: string,
    @Body() data: { fullName?: string; email?: string; profilePhoto?: string },
  ) {
    return this.usersService.updateProfile(id, data);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  async findAll(@Query('page') page = 1, @Query('limit') limit = 20) {
    return this.usersService.findAll(+page, +limit);
  }

  @Get('role/:role')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async findByRole(@Param('role') role: string, @Query('page') page = 1, @Query('limit') limit = 20) {
    return this.usersService.findByRole(role, +page, +limit);
  }

  @Get('search')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async search(@Query('q') query: string, @Query('page') page = 1, @Query('limit') limit = 20) {
    return this.usersService.search(query, +page, +limit);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}