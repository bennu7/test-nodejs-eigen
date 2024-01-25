import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dtos/create-borrow';
import { ParamBorrowDto } from './dtos/param-borrow';

@Controller('/api/borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'SUCCESS GET ALL DATA BORROW BOOKS'.toUpperCase(),
  })
  async findAll(@Res() res: Response) {
    const allDataBorrow = await this.borrowService.findAllData();

    return res.status(200).json({
      statusCode: 200,
      message: 'SUCCESS GET ALL DATA BORROW BOOKS',
      data: allDataBorrow,
    });
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'SUCCESS CREATE BORROW A BOOK'.toUpperCase(),
  })
  async create(@Body() createBorrowDto: CreateBorrowDto, @Res() res: Response) {
    const created = await this.borrowService.createBorrow(
      createBorrowDto.memberId,
      createBorrowDto.bookId,
    );

    return res.status(201).json({
      statusCode: 201,
      message: 'SUCCESS CREATE BORROW A BOOK',
      data: created,
    });
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'SUCCESS DELETE BORROW A BOOK'.toUpperCase(),
  })
  @ApiResponse({
    status: 404,
    description: 'Data borrow a book not found'.toUpperCase(),
  })
  async delete(@Param() { id }: ParamBorrowDto) {
    const deleted = await this.borrowService.deleteBorrow(id);

    return {
      statusCode: 200,
      message: 'SUCCESS DELETE BORROW A BOOK',
      data: deleted,
    };
  }

  @Put('/return/:id')
  @ApiResponse({
    status: 200,
    description: 'You have successfully returned the book'.toUpperCase(),
  })
  @ApiResponse({
    status: 404,
    description: 'Data borrow a book not found'.toUpperCase(),
  })
  async returnBook(@Param() { id }: ParamBorrowDto, @Res() res: Response) {
    const returned = await this.borrowService.returnBook(id);

    return res.status(200).json({
      statusCode: 200,
      message: returned,
    });
  }
}
