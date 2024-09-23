import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateSearchStudentDto {

    @IsString()
    uuid_estudiante: string

    @IsOptional()
    nombre?: string

    @IsOptional()
    apellido?: string

    @IsOptional()
    @IsEmail()
    correo?: string
}