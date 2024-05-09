import { Repository } from 'typeorm';
import { AppDataSource } from '../configs/ormConfig';
import { AuthorEntity } from '../entities/author.entity';

export class AuthorService {
  private readonly authorRepository: Repository<AuthorEntity>;
  constructor() {
    this.authorRepository = AppDataSource.getRepository(AuthorEntity);
  }

  async getAllAuthors(): Promise<AuthorEntity[]> {
    return await this.authorRepository.find({
      order: { firstName: 'ASC' },
    });
  }
}
