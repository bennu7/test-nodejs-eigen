import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  stock: number;
}
