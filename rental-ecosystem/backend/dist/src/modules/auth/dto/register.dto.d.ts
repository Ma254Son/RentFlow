import { UserRole } from '@prisma/client';
export declare class RegisterDto {
    fullName: string;
    phoneNumber: string;
    email?: string;
    password: string;
    role: UserRole;
}
