import { Repository } from 'typeorm';
import { AppDataSource } from '../configs/ormConfig';
import { BookInstanceEntity } from '../entities/bookInstance.entity';
import { formatDate } from '../commons/utils';

export class BookInstanceService {
  private readonly bookInstanceRepository: Repository<BookInstanceEntity>;
  constructor() {
    this.bookInstanceRepository =
      AppDataSource.getRepository(BookInstanceEntity);
  }

  async getAllBookInstances(): Promise<[BookInstanceEntity[], string[]]> {
    const bookInstances = await this.bookInstanceRepository.find({
      order: { imprint: 'ASC' },
      relations: ['book'],
    });
    const dueDates = bookInstances.map(instance =>
      formatDate(instance.dueBack),
    );
    return [bookInstances, dueDates];
  }

  async getBookInstanceDetail(id: number): Promise<BookInstanceEntity | null> {
    return await this.bookInstanceRepository.findOne({
      order: { imprint: 'ASC' },
      relations: ['book'],
      where: { id: id },
    });
  }
}
