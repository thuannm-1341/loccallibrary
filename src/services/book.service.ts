import { Repository } from 'typeorm';
import { BookEntity } from '../entities/book.entity';
import { AppDataSource } from '../configs/ormConfig';
import { AuthorEntity } from '../entities/author.entity';
import { GenreEntity } from '../entities/genre.entity';
import { BookInstanceEntity } from '../entities/bookInstance.entity';
import { BOOK_INSTANCE_STATUS } from '../commons/contants';
import { LibraryGeneralDataDto } from '../commons/dtos/libraryGeneralData.dto';

export class BookService {
  private readonly bookRepository: Repository<BookEntity>;
  private readonly authorRepository: Repository<AuthorEntity>;
  private readonly genreRepository: Repository<GenreEntity>;
  private readonly bookInstanceRepository: Repository<BookInstanceEntity>;
  constructor() {
    this.bookRepository = AppDataSource.getRepository(BookEntity);
    this.authorRepository = AppDataSource.getRepository(AuthorEntity);
    this.genreRepository = AppDataSource.getRepository(GenreEntity);
    this.bookInstanceRepository =
      AppDataSource.getRepository(BookInstanceEntity);
  }

  async getLibraryGeneralData(): Promise<LibraryGeneralDataDto> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [
      numBooks,
      numBookInstances,
      availableBookInstances,
      numAuthors,
      numGenres,
    ] = await Promise.all([
      this.bookRepository.count(),
      this.bookInstanceRepository.count(),
      this.bookInstanceRepository.count({
        where: { status: BOOK_INSTANCE_STATUS.AVAILABLE },
      }),
      this.authorRepository.count(),
      this.genreRepository.count(),
    ]);
    return {
      numBooks,
      numBookInstances,
      availableBookInstances,
      numAuthors,
      numGenres,
    };
  }

  async getAllBooks(): Promise<BookEntity[]> {
    return await this.bookRepository.find({
      order: { title: 'ASC' },
      relations: ['author'],
    });
  }

  async getBookDetail(id: number): Promise<BookEntity | null> {
    return await this.bookRepository.findOne({
      order: { title: 'ASC' },
      relations: ['author', 'bookInstances', 'genres'],
      where: { id: id },
    });
  }

  async saveBook(book: BookEntity): Promise<BookEntity> {
    return await this.bookRepository.save(book);
  }

  async deleteBook(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
