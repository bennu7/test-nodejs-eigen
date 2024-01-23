import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BookEntity } from '../book/book.entity';
import { MemberEntity } from '../member/member.entity';

@Entity({ name: 'loans' })
export class LoanEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => MemberEntity, (member) => member.loans)
  @JoinColumn()
  member: MemberEntity;

  @ManyToOne(() => BookEntity, (book) => book.loans)
  @JoinColumn()
  book: BookEntity;

  @Column('date', { default: new Date() })
  date_borrow: Date;

  @Column('date', { nullable: true })
  date_penalty: Date | null;

  @Column('date', { nullable: true })
  date_return: Date | null;
}
