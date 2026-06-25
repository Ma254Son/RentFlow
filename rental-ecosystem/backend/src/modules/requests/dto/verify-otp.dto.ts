import { IsString, MinLength } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  @MinLength(6)
  otpCode: string;
}