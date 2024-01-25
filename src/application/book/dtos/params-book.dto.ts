import { IsString } from 'class-validator';

export class ParamsBookDto {
  @IsString()
  code: string;
}
