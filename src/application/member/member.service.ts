import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

import { LoanEntity } from 'src/domain/loan/loan.entity';
import { MemberEntity } from 'src/domain/member/member.entity';
import { BookEntity } from 'src/domain/book/book.entity';
import { MemberRepository } from 'src/domain/member/member.repository';
import { LoanRepository } from 'src/domain/loan/loan.repository';
import { BookRepository } from 'src/domain/book/book.repository';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepository: MemberRepository,
    @InjectRepository(LoanEntity)
    private readonly loanRepository: LoanRepository,
    @InjectRepository(BookEntity)
    private readonly bookRepository: BookRepository,
  ) {}

  async borrowABook(codeBook: string, codeUser: string) {
    const member = await this.memberRepository.findById(codeUser);
    if (!member) throw new NotFoundException('Member not found');

    const book = await this.bookRepository.findById(codeBook);
    if (!book) throw new NotFoundException('Book not found');

    const loanBook = await this.loanRepository.findByBook(codeBook);
    if (loanBook.length > 0) throw new BadRequestException('Book not found');

    const loansBook = await this.loanRepository.findByUser(codeUser);
    if (loansBook.length > 2)
      throw new BadRequestException('Maximum number of books reached');

    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const checkFinalized = await this.loanRepository.finalizedByUser(codeUser);
    if (
      checkFinalized.date_penalty !== null ||
      checkFinalized.date_penalty.toISOString() < threeDaysAgo.toISOString()
    )
      throw new BadRequestException('You have a penalty');
    {
    }
  }

  async findAll() {
    return await this.memberRepository.findAll();
  }

  async findOneData(code: string) {
    return await this.memberRepository.findById(code);
  }
}
