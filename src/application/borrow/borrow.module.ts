import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MemberEntity as Member } from 'src/domain/member/member.entity';
import { BookEntity as Book } from 'src/domain/book/book.entity';
import { BorrowEntity as Borrow } from 'src/domain/borrow/borrow.entity';
import { BorrowController } from './borrow.controller';
import { BorrowService } from './borrow.service';
import { BorrowRepository } from 'src/domain/borrow/borrow.repository';
import { MemberRepository } from 'src/domain/member/member.repository';
import { BookRepository } from 'src/domain/book/book.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Book, Borrow])],
  controllers: [BorrowController],
  providers: [
    BorrowRepository,
    MemberRepository,
    BookRepository,
    BorrowService,
  ],
  exports: [BorrowService, TypeOrmModule],
})
export class BorrowModule {}
