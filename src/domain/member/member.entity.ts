import { OneToMany, Entity, Column } from 'typeorm';
import { LoanEntity } from '../loan/loan.entity';

@Entity({ name: 'members' })
export class MemberEntity {
  @Column({ primary: true, unique: true })
  code: string;

  @Column()
  name: string;

  @OneToMany(() => LoanEntity, (load) => load.member)
  loans: LoanEntity[];
}
