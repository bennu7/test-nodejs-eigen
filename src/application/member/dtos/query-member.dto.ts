import { IsString, IsEnum, IsOptional } from 'class-validator';

export class QueryMemberDto {
  @IsString()
  @IsOptional()
  @IsEnum(['true', 'false'], {
    message: 'isIncludedBorrow must be true or false',
  })
  isIncludedBorrow: string;
}

export class QueryMemberIdDto {
  @IsString()
  memberId: string;
}
