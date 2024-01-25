import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Res,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiBody } from '@nestjs/swagger';

import { CreateBookDto } from './dtos/create-book.dto';
import { BookService } from './book.service';
import { ParamsBookDto } from './dtos/params-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';

@Controller('/api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Book created'.toUpperCase() })
  @ApiBody({ type: CreateBookDto })
  async create(@Body() createBookDto: CreateBookDto, @Res() res: Response) {
    const created = await this.bookService.create(createBookDto);

    return res.status(201).json({
      message: 'Book created'.toUpperCase(),
      data: created,
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const books = await this.bookService.findAll();

    return res.status(200).json({
      message: 'Books found'.toUpperCase(),
      data: books,
    });
  }

  @Get(':code')
  async findOne(@Param() { code }: ParamsBookDto, @Res() res: Response) {
    const book = await this.bookService.findOne(code);

    return res.status(200).json({
      message: 'Book found'.toUpperCase(),
      data: book,
    });
  }

  @Put(':code')
  @ApiResponse({ status: 200, description: 'Book updated'.toUpperCase() })
  @ApiBody({ type: UpdateBookDto })
  async update(
    @Param() { code }: ParamsBookDto,
    @Body() createBookDto: UpdateBookDto,
    @Res() res: Response,
  ) {
    const updated = await this.bookService.update(code, createBookDto);

    return res.status(200).json({
      message: 'Book updated'.toUpperCase(),
      data: updated,
    });
  }

  @Delete(':code')
  @ApiResponse({ status: 200, description: 'Book deleted'.toUpperCase() })
  async delete(@Param() { code }: ParamsBookDto, @Res() res: Response) {
    const deleted = await this.bookService.delete(code);

    return res.status(200).json({
      message: 'Book deleted'.toUpperCase(),
      data: deleted,
    });
  }
}
