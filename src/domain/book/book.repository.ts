import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity as Book } from './book.entity';

export class BookRepository extends Repository<Book> {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {
    super(
      bookRepository.target,
      bookRepository.manager,
      bookRepository.queryRunner,
    );
  }

  async findAll(): Promise<Book[]> {
    return await this.find({ relations: ['borrows'] });
  }

  async findById(code: string): Promise<Book> {
    const data = await this.find({
      where: { code },
      take: 1,
      relations: ['borrows'],
    });
    return data[0];
  }

  async store(book: Book): Promise<Book> {
    return await this.save(book);
  }

  async updateOne(book: Book): Promise<Book> {
    const updated = await this.update(
      { code: book.code },
      {
        author: book.author,
        stock: book.stock,
      },
    );

    if (updated.affected > 0) return book;
  }

  async deleteOne(book: Book): Promise<number> {
    const deleted = await this.delete({
      code: book.code,
    });

    return deleted.affected;
  }

  async decrementStock(code: string) {
    const book = await this.findOne({ where: { code } });
    book.stock -= 1;

    return await this.save(book);
  }

  async incrementStock(bookId: string) {
    const book = await this.findOne({ where: { code: bookId } });
    book.stock += 1;

    return await this.save(book);
  }
}
