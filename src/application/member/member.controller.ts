import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { MemberService } from './member.service';
import { ParamMemberIdDto } from './dtos/param-member.dto';
import { CreateMemberDto } from './dtos/create-member.dto';
import { UpdateMemberDto } from './dtos/update-member.dto';

@Controller('/api/member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async create(@Body() data: CreateMemberDto, @Res() res: Response) {
    const member = await this.memberService.createData(data.name);
    return res.status(201).json({
      statusCode: 201,
      message: 'Member has been created',
      data: member,
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.memberService.findAllData();

    return res.status(200).json({
      statusCode: 200,
      message: 'SUCCESS GET ALL DATA MEMBER',
      data,
    });
  }

  @Get(':memberId')
  async findOneData(
    @Param() { memberId }: ParamMemberIdDto,
    @Res() res: Response,
  ) {
    const data = await this.memberService.findOneData(memberId);
    return res.status(200).json({
      statusCode: 200,
      message: 'SUCCESS GET DATA A MEMBER',
      data,
    });
  }

  @Put(':memberId')
  async update(
    @Param() { memberId }: ParamMemberIdDto,
    @Body() data: UpdateMemberDto,
    @Res() res: Response,
  ) {
    const updated = await this.memberService.updateData(
      memberId,
      data.name,
      data.date_penalty,
    );

    return res.status(200).json({
      statusCode: 200,
      message: 'SUCCESS UPDATE DATA MEMBER',
      data: updated,
    });
  }

  @Delete(':memberId')
  async remove(@Param() { memberId }: ParamMemberIdDto, @Res() res: Response) {
    await this.memberService.deleteData(memberId);

    return res.status(200).json({
      statusCode: 200,
      message: 'SUCCESS DELETE DATA MEMBER',
    });
  }
}
