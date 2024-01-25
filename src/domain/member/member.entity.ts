import { OneToMany, Entity, Column } from 'typeorm';
import { BorrowEntity } from '../borrow/borrow.entity';

@Entity({ name: 'members' })
export class MemberEntity {
  @Column({ primary: true, unique: true })
  code: string;

  @Column()
  name: string;

  @Column('date', { default: new Date(), nullable: true })
  date_penalty: Date | null;

  @OneToMany(() => BorrowEntity, (load) => load.member)
  borrows: BorrowEntity[];
}
