import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBorrowDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  memberId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bookId: string;
}
