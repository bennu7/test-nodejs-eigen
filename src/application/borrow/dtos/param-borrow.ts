import { IsNotEmpty, IsUUID } from 'class-validator';

export class ParamBorrowDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
