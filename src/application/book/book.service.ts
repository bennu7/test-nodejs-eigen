import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

import { BookRepository } from 'src/domain/book/book.repository';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const checkIdBook = await this.bookRepository.findById(createBookDto.code);
    if (checkIdBook) throw new BadRequestException('ID book already exists');

    const bookEntity = { ...createBookDto, borrows: [] };
    return await this.bookRepository.store({
      ...bookEntity,
      stock: 1,
    });
  }

  async findAll() {
    return await this.bookRepository.findAll();
  }

  async findOne(code: string) {
    return await this.bookRepository.findById(code);
  }

  async update(code: string, createBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findById(code);
    if (!book) throw new BadRequestException('Book not found');

    const bookEntity = { ...book, ...createBookDto };
    return await this.bookRepository.updateOne(bookEntity);
  }

  async delete(code: string) {
    const book = await this.bookRepository.findById(code);
    if (!book) throw new BadRequestException('Book not found');

    return await this.bookRepository.deleteOne(book);
  }
}
