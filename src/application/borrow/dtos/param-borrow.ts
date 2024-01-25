import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ParamBorrowDto {
  @ApiProperty({
    type: String,
    description: 'The unique identifier for a user (UUID)',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
