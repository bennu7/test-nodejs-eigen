import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ParamMemberIdDto {
  @ApiProperty()
  @IsString()
  memberId: string;
}
