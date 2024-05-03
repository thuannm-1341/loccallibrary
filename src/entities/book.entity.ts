import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BookInstanceEntity } from './bookInstance.entity';
import { AuthorEntity } from './author.entity';
import { GenreEntity } from './genre.entity';
import { ENTITY_PROPERTY_LENGTH } from '../commons/contants';
import { BaseEntity } from './base.entity';

@Entity('Book')
export class BookEntity extends BaseEntity {
  @Column({
    name: 'title',
    type: 'varchar',
    length: ENTITY_PROPERTY_LENGTH.MEDIUM,
  })
  title: string;

  @Column({
    name: 'summary',
    type: 'varchar',
    length: ENTITY_PROPERTY_LENGTH.EXTRA_LARGE,
  })
  summary: string;

  @Column({
    name: 'isbn',
    type: 'varchar',
    length: ENTITY_PROPERTY_LENGTH.SMALL,
    nullable: true,
  })
  isbn: string;

  @ManyToOne(() => AuthorEntity, author => author.books)
  @JoinColumn({ name: 'author_id' })
  author: AuthorEntity;

  @OneToMany(() => BookInstanceEntity, bookInstance => bookInstance.book)
  bookInstances: BookInstanceEntity[];

  @ManyToMany(() => GenreEntity)
  @JoinTable()
  genres: GenreEntity[];
}
