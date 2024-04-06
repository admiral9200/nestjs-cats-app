import { IsBoolean, IsEmail, IsInt, IsString } from 'class-validator';


export class CreateUserDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    readonly firstName: string;

    @IsString()
    readonly lastName: string;

    @IsString()
    readonly password: string;

    @IsBoolean()
    readonly role: boolean
}