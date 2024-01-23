import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity as Member } from 'src/domain/member/member.entity';
import { BookEntity as Book } from 'src/domain/book/book.entity';
import { LoanEntity as Loan } from 'src/domain/loan/loan.entity';
import { MemberRepository } from 'src/domain/member/member.repository';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Book, Loan])],
  controllers: [MemberController],
  providers: [MemberRepository, MemberService],
  exports: [MemberService, TypeOrmModule],
})
export class MemberModule {}
