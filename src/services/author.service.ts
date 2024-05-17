import { Repository } from 'typeorm';
import { AppDataSource } from '../configs/ormConfig';
import { AuthorEntity } from '../entities/author.entity';
import { formatDate } from '../commons/utils';

export class AuthorService {
  private readonly authorRepository: Repository<AuthorEntity>;
  constructor() {
    this.authorRepository = AppDataSource.getRepository(AuthorEntity);
  }

  async getAllAuthors(): Promise<[AuthorEntity[], string[], string[]]> {
    const authors = await this.authorRepository.find({
      order: { firstName: 'ASC' },
    });
    const authorBirthDates = authors.map(author => {
      return formatDate(author.dateOfBirth);
    });
    const authorDeathDates = authors.map(author =>
      formatDate(author.dateOfDeath),
    );
    return [authors, authorBirthDates, authorDeathDates];
  }

  async getAuthorDetails(id: number): Promise<AuthorEntity | null> {
    return await this.authorRepository.findOne({
      order: { firstName: 'ASC' },
      relations: ['books'],
      where: { id: id },
    });
  }

  async deleteAuthor(id: number): Promise<void> {
    await this.authorRepository.delete(id);
  }

  async saveAuthor(author: AuthorEntity): Promise<AuthorEntity> {
    return await this.authorRepository.save(author);
  }
}
