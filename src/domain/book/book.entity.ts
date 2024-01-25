import { Entity, Column, OneToMany } from 'typeorm';
import { BorrowEntity } from '../borrow/borrow.entity';

@Entity({ name: 'books' })
export class BookEntity {
  @Column({ primary: true, unique: true })
  code: string;

  @Column({ length: 500 })
  title: string;

  @Column()
  author: string;

  @Column('int', { default: 1 })
  stock: number;

  @OneToMany(() => BorrowEntity, (borrow) => borrow.book)
  borrows: BorrowEntity[];
}
