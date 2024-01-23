import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity as Member } from './member.entity';

export class MemberRepository extends Repository<Member> {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {
    super(
      memberRepository.target,
      memberRepository.manager,
      memberRepository.queryRunner,
    );
  }

  async findAll(): Promise<Member[]> {
    return await this.find();
  }

  async findById(code: string): Promise<Member> {
    return await this.findOne({ where: { code } });
  }

  async store(member: Member): Promise<Member> {
    return await this.save(member);
  }

  async updateOne(member: Member): Promise<Member> {
    return await this.save(member);
  }

  async deleteOne(member: Member): Promise<Member> {
    return await this.remove(member);
  }
}
