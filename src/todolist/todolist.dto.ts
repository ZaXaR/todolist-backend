import { Type } from "class-transformer";
import { IsBoolean, IsEmail, IsOptional, IsString, Max, Min, MinLength } from "class-validator";

export class TodoListDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsString()
    @Max(100)
    text: string;

    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean;


    @IsOptional()
    @Type(() => Date)
    endDate?: Date;
}

export class UpdateTodoListDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    @Max(100)
    text?: string;

    @IsOptional()
    @Type(() => Date)
    endDate?: Date;

    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean;

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