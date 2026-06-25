import { IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateMaintenanceDto {
  @IsString()
  propertyId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}