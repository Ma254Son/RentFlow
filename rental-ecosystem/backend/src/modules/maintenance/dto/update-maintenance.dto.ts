import { IsEnum, IsOptional } from 'class-validator';

export class UpdateMaintenanceDto {
  @IsOptional()
  @IsEnum(['open', 'in_progress', 'resolved'])
  status?: 'open' | 'in_progress' | 'resolved';
}