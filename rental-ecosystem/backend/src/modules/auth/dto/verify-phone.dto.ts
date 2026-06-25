import { IsString, MinLength } from 'class-validator';

export class VerifyPhoneDto {
  @IsString()
  @MinLength(10)
  phoneNumber: string;

  @IsString()
  @MinLength(4)
  otpCode: string;
}