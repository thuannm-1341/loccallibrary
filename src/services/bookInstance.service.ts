import { Repository } from 'typeorm';
import { AppDataSource } from '../configs/ormConfig';
import { BookInstanceEntity } from '../entities/bookInstance.entity';

export class BookInstanceService {
  private readonly bookInstanceRepository: Repository<BookInstanceEntity>;
  constructor() {
    this.bookInstanceRepository =
      AppDataSource.getRepository(BookInstanceEntity);
  }

  async getAllBookInstances(): Promise<BookInstanceEntity[]> {
    return await this.bookInstanceRepository.find({
      order: { imprint: 'ASC' },
      relations: ['book'],
    });
  }
}
