import { IsOptional, IsString, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateMemberDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  date_penalty: Date | null;
}
