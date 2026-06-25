import { IsString, IsNumber, IsOptional, IsArray, Min, Max } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  location: string;

  @IsNumber()
  @Min(0)
  rentAmount: number;

  @IsNumber()
  @Min(0)
  @Max(50)
  bedrooms: number;

  @IsNumber()
  @Min(0)
  @Max(50)
  bathrooms: number;

  @IsOptional()
  @IsArray()
  amenities?: string[];
}