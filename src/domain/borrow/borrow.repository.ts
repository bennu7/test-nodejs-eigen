import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { MemberEntity as Member } from '../member/member.entity';
import { BookEntity as Book } from '../book/book.entity';
import { BorrowEntity as Borrow } from './borrow.entity';

export class BorrowRepository extends Repository<Borrow> {
  constructor(
    @InjectRepository(Borrow)
    private borrowRepository: Repository<Borrow>,
  ) {
    super(
      borrowRepository.target,
      borrowRepository.manager,
      borrowRepository.queryRunner,
    );
  }

  async findAll(): Promise<Borrow[]> {
    return await this.find({ relations: ['book', 'member'] });
  }

  async findById(id: string): Promise<Borrow> {
    return await this.findOne({ where: { id }, relations: ['book', 'member'] });
  }

  async findByUser(codeUser: string): Promise<Borrow[]> {
    return await this.find({ where: { member: { code: codeUser } } });
  }

  async finalizedByUser(codeUser: string): Promise<Borrow> {
    return await this.findOne({
      where: { member: { code: codeUser } },
    });
  }

  async findByBook(codeBook: string): Promise<Borrow[]> {
    return await this.find({ where: { book: { code: codeBook } } });
  }

  async store(member: Member, book: Book): Promise<Borrow> {
    const borrowBook = new Borrow();
    borrowBook.member = member;
    borrowBook.book = book;

    return await this.save(borrowBook);
  }

  async updateOne(borrow: Borrow): Promise<Borrow> {
    return await this.save(borrow);
  }

  async deleteOne(idBorrow: string): Promise<number> {
    const deleted = await this.delete({
      id: idBorrow,
    });

    return deleted.affected;
  }

  async returnBook(idBorrow: string): Promise<Borrow> {
    const borrow = await this.findOne({ where: { id: idBorrow } });
    borrow.date_return = new Date();

    return await this.save(borrow);
  }
}
