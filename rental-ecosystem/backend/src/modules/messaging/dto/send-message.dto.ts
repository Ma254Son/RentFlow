import { IsString, IsOptional } from 'class-validator';

export class SendMessageDto {
  @IsString()
  receiverId: string;

  @IsOptional()
  @IsString()
  propertyId?: string;

  @IsString()
  message: string;
}