import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBorrowDto {
  @IsNotEmpty()
  @IsString()
  memberId: string;

  @IsNotEmpty()
  @IsString()
  bookId: string;
}
