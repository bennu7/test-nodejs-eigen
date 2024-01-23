import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'src/domain/book/book.entity';
import { LoanEntity } from 'src/domain/loan/loan.entity';
import { BookRepository } from 'src/domain/book/book.repository';

@Module({
  // imports: [TypeOrmModule.forFeature([BookEntity, LoanEntity])],
  providers: [],
})
export class BookModule {}
