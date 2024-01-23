import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';

export class BookRepository extends Repository<BookEntity> {
  constructor(private bookRepository: Repository<BookEntity>) {
    super(
      bookRepository.target,
      bookRepository.manager,
      bookRepository.queryRunner,
    );
  }

  async findAll(): Promise<BookEntity[]> {
    return await this.find();
  }

  async findById(code: string): Promise<BookEntity> {
    return await this.findOne({ where: { code } });
  }

  async store(book: BookEntity): Promise<BookEntity> {
    return await this.save(book);
  }

  async updateOne(book: BookEntity): Promise<BookEntity> {
    return await this.save(book);
  }

  async deleteOne(book: BookEntity): Promise<BookEntity> {
    return await this.remove(book);
  }
}
