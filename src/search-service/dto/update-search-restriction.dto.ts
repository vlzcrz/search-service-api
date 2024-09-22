import { IsBoolean, IsNumber, IsString, Max, Min } from "class-validator";

export class InsertSearchByRestrictionDto {

    @IsString()
    uuid_estudiante: string

    @IsString()
    uuid_restriccion: string

    @IsString()
    razon: string

    @IsBoolean()
    isActive: boolean

    @IsString()
    fecha_creacion: string
    
}
