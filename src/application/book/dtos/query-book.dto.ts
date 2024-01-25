import { IsString, IsEnum, IsOptional } from 'class-validator';

export class QueryBookDto {
  @IsString()
  @IsOptional()
  @IsEnum(['true', 'false'])
  isIncludedBorrow: string;
}
