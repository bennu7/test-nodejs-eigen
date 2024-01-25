import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BookEntity } from '../book/book.entity';
import { MemberEntity } from '../member/member.entity';

@Entity({ name: 'borrows' })
export class BorrowEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => MemberEntity, (member) => member.borrows)
  @JoinColumn()
  member: MemberEntity;

  @ManyToOne(() => BookEntity, (book) => book.borrows)
  @JoinColumn()
  book: BookEntity;

  @Column('date', { default: new Date() })
  date_borrow: Date;

  @Column('date', { nullable: true })
  date_return: Date | null;
}
