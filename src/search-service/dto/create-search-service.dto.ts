import { IsEmail, IsString } from "class-validator";


export class CreateSearchDto {
    
    @IsString()
    uuid_estudiante: string

    @IsString()
    nombre: string

    @IsString()
    apellido: string

    @IsEmail()
    correo: string
}
