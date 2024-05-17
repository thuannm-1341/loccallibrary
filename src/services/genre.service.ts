import { In, Repository } from 'typeorm';
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

  async getGenreDetail(id: number): Promise<GenreEntity | null> {
    return await this.genreRepository.findOne({
      order: { name: 'ASC' },
      relations: ['books'],
      where: { id: id },
    });
  }

  async findOneByName(name: string): Promise<GenreEntity | null> {
    return await this.genreRepository.findOne({
      where: { name: name },
    });
  }

  async saveGenre(genre: GenreEntity): Promise<GenreEntity> {
    return await this.genreRepository.save(genre);
  }

  async findManyById(ids: number[]): Promise<GenreEntity[]> {
    return await this.genreRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async deleteGenre(id: number): Promise<void> {
    await this.genreRepository.delete(id);
  }
}
