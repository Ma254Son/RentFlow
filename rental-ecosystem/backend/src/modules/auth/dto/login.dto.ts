import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(10)
  phoneNumber: string;

  @IsString()
  password: string;
}