import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ParamsBookDto {
  @ApiProperty()
  @IsString()
  code: string;
}
