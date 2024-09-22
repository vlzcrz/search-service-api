import { IsOptional, IsString } from 'class-validator';

export class SearchStudentDto {
  @IsOptional()
  @IsString()
  uuid_estudiante?: string;

  @IsOptional()
  @IsString()
  nombre?: string;
}