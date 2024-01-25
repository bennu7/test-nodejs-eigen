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

  async findAllMember(): Promise<Member[]> {
    return await this.find({ relations: ['borrows'] });
  }

  async findById(code: string): Promise<Member> {
    const data = await this.find({
      where: { code },
      take: 1,
      relations: ['borrows'],
    });
    return data[0];
  }

  async store(member: Member): Promise<Member> {
    return await this.save(member);
  }

  async updateOne(member: Partial<Member>): Promise<Member> {
    const updated = await this.update(
      { code: member.code },
      {
        name: member.name,
        date_penalty: member.date_penalty,
      },
    );
    if (updated.affected > 0) return updated.raw[0];
  }

  async deleteOne(member: Member): Promise<number> {
    return (await this.delete({ code: member.code })).affected;
  }

  async getLastNewMember(): Promise<Member> {
    const find = await this.find({
      order: {
        code: 'DESC',
      },
      take: 1,
      select: ['code'],
    });

    return find[0];
  }

  async findDuplicatName(name: string): Promise<boolean> {
    const find = await this.find({ where: { name }, take: 1 });

    return find.length > 0;
  }
}
