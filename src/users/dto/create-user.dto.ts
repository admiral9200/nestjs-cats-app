import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export enum UserRole {
    User = 'user',
    Admin = 'admin'
};


export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsBoolean()
    readonly role: boolean
}