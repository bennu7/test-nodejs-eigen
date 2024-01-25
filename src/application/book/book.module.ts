import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookEntity as Book } from 'src/domain/book/book.entity';
import { BorrowEntity as Borrow } from 'src/domain/borrow/borrow.entity';
import { BookRepository } from 'src/domain/book/book.repository';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Borrow])],
  controllers: [BookController],
  providers: [BookService, BookRepository],
  exports: [BookService, TypeOrmModule],
})
export class BookModule {}
