import { Entity, Column, OneToMany } from 'typeorm';
import { LoanEntity } from '../loan/loan.entity';

@Entity({ name: 'books' })
export class BookEntity {
  @Column({ primary: true, unique: true })
  code: string;

  @Column({ length: 500 })
  title: string;

  @Column()
  author: string;

  @Column('int')
  stock: number;

  @OneToMany(() => LoanEntity, (loan) => loan.book)
  loans: LoanEntity[];
}
