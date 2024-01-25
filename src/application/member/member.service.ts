import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

import { MemberRepository } from 'src/domain/member/member.repository';
import { generateId } from 'src/utils/generate-id.util';
import { MemberEntity as Member } from 'src/domain/member/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberRepository)
    private readonly memberRepository: MemberRepository,
  ) {}

  async findAllData() {
    const allDataMember = await this.memberRepository.findAllMember();

    return allDataMember;
  }

  async findOneData(code: string): Promise<Member> {
    const data = await this.memberRepository.findById(code);
    if (!data) throw new NotFoundException('Member not found');
    return data;
  }

  async createData(nameMember: string): Promise<any> {
    const checkName = await this.memberRepository.findDuplicatName(nameMember);
    if (checkName) throw new BadRequestException('Name already exist');

    const lastMember = await this.memberRepository.getLastNewMember();
    const generatedId = generateId(lastMember?.code);

    const created = await this.memberRepository.store({
      code: generatedId,
      name: nameMember,
      date_penalty: null,
      borrows: [],
    });

    return created;
  }

  async updateData(
    code: string,
    nameMember?: string,
    datePenalty?: Date | null,
  ): Promise<Member> {
    const member = await this.memberRepository.findById(code);
    if (!member) throw new NotFoundException('Member not found');

    if (nameMember) {
      const checkName =
        await this.memberRepository.findDuplicatName(nameMember);
      if (checkName) throw new BadRequestException('Name already exist');
    }

    member.date_penalty = datePenalty;
    member.name = nameMember;
    return await this.memberRepository.updateOne(member);
  }

  async deleteData(code: string): Promise<number> {
    const member = await this.memberRepository.findById(code);
    if (!member) throw new NotFoundException('Member not found');

    return await this.memberRepository.deleteOne(member);
  }
}
