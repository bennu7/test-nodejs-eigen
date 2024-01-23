import { Repository } from 'typeorm';
import { LoanEntity as Loan } from './loan.entity';

export class LoanRepository extends Repository<Loan> {
  constructor(private loanRepository: Repository<Loan>) {
    super(
      loanRepository.target,
      loanRepository.manager,
      loanRepository.queryRunner,
    );
  }

  async findAll(): Promise<Loan[]> {
    return await this.find();
  }

  async findById(id: string): Promise<Loan> {
    return await this.findOne({ where: { id } });
  }

  async findByUser(codeUser: string): Promise<Loan[]> {
    return await this.find({ where: { member: { code: codeUser } } });
  }

  async finalizedByUser(codeUser: string): Promise<Loan> {
    return await this.findOne({
      where: { member: { code: codeUser } },
      select: ['date_penalty'],
    });
  }

  async findByBook(codeBook: string): Promise<Loan[]> {
    return await this.find({ where: { book: { code: codeBook } } });
  }

  async store(loan: Loan): Promise<Loan> {
    return await this.save(loan);
  }

  async updateOne(loan: Loan): Promise<Loan> {
    return await this.save(loan);
  }

  async deleteOne(loan: Loan): Promise<Loan> {
    return await this.remove(loan);
  }
}
