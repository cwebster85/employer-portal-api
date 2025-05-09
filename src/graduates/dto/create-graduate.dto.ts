import { IsString, IsEmail, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateGraduateDto {
    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsString()
    university: string;

    @IsString()
    degree: string;

    @IsNumber()
    graduationYear: number;

    @IsArray()
    @IsString({ each: true })
    skills: string[];

    @IsOptional()
    @IsString()
    portfolioUrl?: string;
}
