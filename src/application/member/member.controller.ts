import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { MemberService } from './member.service';

@Controller('/api/member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Get(':code')
  findOneData(@Param('code') code: string) {
    return this.memberService.findOneData(code);
  }

  @Post()
  create() {
    return 'This action adds a new member';
  }

  @Put(':code')
  update() {
    return 'This action updates a member';
  }

  @Delete(':code')
  remove() {
    return 'This action removes a member';
  }
}
