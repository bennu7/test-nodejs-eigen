import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsString()
  author: string;

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsNumber()
  stock: number;
}
