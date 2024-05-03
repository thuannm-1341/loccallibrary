import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BookEntity } from './book.entity';
import { ENTITY_PROPERTY_LENGTH } from '../commons/contants';

@Entity('BookInstance')
export class BookInstanceEntity extends BaseEntity {
  @Column({
    name: 'imprint',
    type: 'varchar',
    length: ENTITY_PROPERTY_LENGTH.MEDIUM,
  })
  imprint: string;

  @Column({
    name: 'status',
    type: 'varchar',
    length: ENTITY_PROPERTY_LENGTH.MEDIUM,
  })
  status: string;

  @Column({
    name: 'due_back',
    type: 'timestamp',
  })
  dueBack: Date;

  @ManyToOne(() => BookEntity, book => book.bookInstances)
  @JoinColumn({ name: 'book_id' })
  book: BookEntity;

  url(): string {
    return `/book-instances/${this.id}`;
  }
}
