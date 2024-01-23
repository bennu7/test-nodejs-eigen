import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructures/database/database.module';
import { BookModule } from './application/book/book.module';
import { MemberModule } from './application/member/member.module';
import { UsersModule } from './application/user/users.module';

@Module({
  imports: [DatabaseModule, BookModule, MemberModule, UsersModule],
})
export class AppModule {}
