import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ENTITY_PROPERTY_LENGTH } from '../commons/contants';
import { BookEntity } from './book.entity';

@Entity('author')
export class AuthorEntity extends BaseEntity {
  @Column({
    name: 'first_name',
    type: 'varchar',
    length: ENTITY_PROPERTY_LENGTH.SMALL,
  })
  firstName: string;

  @Column({
    name: 'family_name',
    type: 'varchar',
    length: ENTITY_PROPERTY_LENGTH.SMALL,
  })
  familyName: string;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ name: 'date_of_death', type: 'date', nullable: true })
  dateOfDeath: Date;

  @OneToMany(() => BookEntity, book => book.author)
  books: BookEntity[];

  name(): string {
    return `${this.firstName} ${this.familyName}`;
  }

  url(): string {
    return `/authors/${this.id}`;
  }
}
