import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructures/database/database.module';
import { BookModule } from './application/book/book.module';
import { MemberModule } from './application/member/member.module';
import { BorrowModule } from './application/borrow/borrow.module';

@Module({
  imports: [DatabaseModule, BookModule, MemberModule, BorrowModule],
})
export class AppModule {}
