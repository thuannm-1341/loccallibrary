import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BookEntity } from './book.entity';
import { ENTITY_PROPERTY_LENGTH } from '../commons/contants';

@Entity('Genre')
export class GenreEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: ENTITY_PROPERTY_LENGTH.LARGE,
  })
  name: string;

  @ManyToMany(() => BookEntity)
  @JoinTable()
  books: BookEntity[];

  url(): string {
    return `/genres/${this.id}`;
  }
}
