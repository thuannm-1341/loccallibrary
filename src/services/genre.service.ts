import { Repository } from 'typeorm';
import { AppDataSource } from '../configs/ormConfig';
import { GenreEntity } from '../entities/genre.entity';

export class GenreService {
  private readonly genreRepository: Repository<GenreEntity>;
  constructor() {
    this.genreRepository = AppDataSource.getRepository(GenreEntity);
  }

  async getAllGenres(): Promise<GenreEntity[]> {
    return await this.genreRepository.find({
      order: { name: 'ASC' },
    });
  }
}
