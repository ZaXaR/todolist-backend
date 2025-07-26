import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthDto {
    @IsEmail()
    email: string;

    @MinLength(6, { message: 'Password is too short. It should be at least 6 characters.' })
    @IsString() // IsPassword ()
    password: string;
}
