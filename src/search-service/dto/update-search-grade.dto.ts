import { IsNumber, IsString, Max, Min } from "class-validator";

export class UpdateSearchByGradeDto {

    @IsString()
    uuid_estudiante: string

    @IsString()
    uuid_calificacion: string

    @IsString()
    asignatura: string

    @IsString()
    nombre_calificacion: string

    @IsNumber()
    @Min(1)
    @Max(7)
    calificacion: number

    @IsString()
    comentario: string
    
}
