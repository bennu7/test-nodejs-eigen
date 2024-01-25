import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

import { MemberRepository } from 'src/domain/member/member.repository';
import { BorrowRepository } from 'src/domain/borrow/borrow.repository';
import { BookRepository } from 'src/domain/book/book.repository';
import { checkDatePenalty } from 'src/utils/date-helper';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(MemberRepository)
    private readonly memberRepository: MemberRepository,
    @InjectRepository(BorrowRepository)
    private readonly borrowRepository: BorrowRepository,
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}

  async findAllData() {
    const allDataMember = await this.borrowRepository.findAll();

    return allDataMember;
  }

  async createBorrow(memberID: string, bookID: string) {
    const member = await this.memberRepository.findById(memberID);
    if (!member) throw new NotFoundException('Member not found'.toUpperCase());
    const book = await this.bookRepository.findById(bookID);
    if (!book) throw new NotFoundException('Book not found'.toUpperCase());

    const chekIsBorrow = await this.borrowRepository.findByBook(bookID);
    if (chekIsBorrow[0]?.date_borrow && !chekIsBorrow[0]?.date_return)
      throw new BadRequestException(
        'uupps this book is borrowed'.toUpperCase(),
      );

    if (member.date_penalty && !checkDatePenalty(member.date_penalty, 3)) {
      throw new BadRequestException(
        'currently you have a penalty'.toUpperCase(),
      );
    }

    const borrow = await this.borrowRepository.store(member, book);
    await this.bookRepository.decrementStock(book.code);

    return borrow;
  }

  async deleteBorrow(id: string) {
    const checkBorrowBook = await this.borrowRepository.findById(id);
    if (!checkBorrowBook)
      throw new NotFoundException('Data borrow a book not found'.toUpperCase());
    const bookId = checkBorrowBook.book.code;

    const borrow = await this.borrowRepository.deleteOne(checkBorrowBook.id);
    await this.bookRepository.incrementStock(bookId);

    return borrow;
  }

  async returnBook(id: string): Promise<string> {
    const dataBorrowBook = await this.borrowRepository.findById(id);
    if (!dataBorrowBook)
      throw new NotFoundException('Data borrow a book not found'.toUpperCase());
    const bookId = dataBorrowBook.book.code;

    if (checkDatePenalty(dataBorrowBook.date_borrow, 7)) {
      await this.memberRepository.updateOne({
        code: dataBorrowBook.member.code,
        date_penalty: new Date(),
      });
      await this.borrowRepository.returnBook(dataBorrowBook.id);
      await this.bookRepository.incrementStock(bookId);

      return 'success and you have a penalty because you return the book late'.toUpperCase();
    }

    await this.borrowRepository.returnBook(dataBorrowBook.id);
    await this.bookRepository.incrementStock(bookId);

    return 'You have successfully returned the book'.toUpperCase();
  }
}
