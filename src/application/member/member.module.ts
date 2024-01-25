import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MemberEntity as Member } from 'src/domain/member/member.entity';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MemberRepository } from 'src/domain/member/member.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [MemberController],
  providers: [MemberRepository, MemberService],
  exports: [MemberService, TypeOrmModule],
})
export class MemberModule {}
