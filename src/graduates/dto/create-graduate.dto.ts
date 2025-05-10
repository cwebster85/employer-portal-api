import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsString,
    IsEmail,
    IsInt,
    Min,
    Max,
    IsArray,
    IsOptional,
    IsUrl,
    ArrayNotEmpty,
} from 'class-validator';

export class CreateGraduateDto {
    @ApiProperty()
    @IsString()
    fullName: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    university: string;

    @ApiProperty()
    @IsString()
    degree: string;

    @ApiProperty()
    @IsInt()
    @Min(1950)
    @Max(2100)
    graduationYear: number;

    @ApiProperty({ type: [String] })
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    skills: string[];

    @ApiProperty({ required: false })
    @IsOptional()
    @IsUrl()
    @Transform(({ value }) => value === '' ? undefined : value)
    portfolioUrl?: string;
}