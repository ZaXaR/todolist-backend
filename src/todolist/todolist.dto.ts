import { IsBoolean, IsEmail, IsOptional, IsString, Max, Min, MinLength } from "class-validator";

export class TodoListDto {
    @IsString()
    @Min(6)
    title: string;

    @IsString()
    @Min(6)
    @Max(100)
    text: string;

    @IsBoolean()
    isCompleted: boolean;

    @IsOptional()
    endDate?: Date;
}

export class UserDto extends TodoListDto {
    @IsEmail()
    email?: string;

    @MinLength(6, { message: 'Password is too short. It should be at least 6 characters.' })
    @IsString() // IsPassword ()
    password?: string;

    @IsString()
    @Min(6)
    name?: string;
}