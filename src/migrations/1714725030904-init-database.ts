import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1714725030904 implements MigrationInterface {
  name = 'InitDatabase1714725030904';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `BookInstance` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `imprint` varchar(50) NOT NULL, `status` varchar(50) NOT NULL, `due_back` timestamp NOT NULL, `book_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `author` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `first_name` varchar(30) NOT NULL, `family_name` varchar(30) NOT NULL, `date_of_birth` date NULL, `date_of_death` date NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `Book` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `title` varchar(50) NOT NULL, `summary` varchar(1000) NOT NULL, `isbn` varchar(30) NULL, `author_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `Genre` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(200) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `book_genres_genre` (`bookId` int NOT NULL, `genreId` int NOT NULL, INDEX `IDX_31d658e0af554165f4598158c5` (`bookId`), INDEX `IDX_83bd32782d44d9db3d68c3f58c` (`genreId`), PRIMARY KEY (`bookId`, `genreId`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `genre_books_book` (`genreId` int NOT NULL, `bookId` int NOT NULL, INDEX `IDX_0690591237ade3109687a5afec` (`genreId`), INDEX `IDX_56a73217b062dfedfb221dd7ec` (`bookId`), PRIMARY KEY (`genreId`, `bookId`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `BookInstance` ADD CONSTRAINT `FK_eed6d142dd9d4f682f2c60155ab` FOREIGN KEY (`book_id`) REFERENCES `Book`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `Book` ADD CONSTRAINT `FK_bccb94b5569f228e3c4b9d763ab` FOREIGN KEY (`author_id`) REFERENCES `author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `book_genres_genre` ADD CONSTRAINT `FK_31d658e0af554165f4598158c55` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `book_genres_genre` ADD CONSTRAINT `FK_83bd32782d44d9db3d68c3f58c1` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `genre_books_book` ADD CONSTRAINT `FK_0690591237ade3109687a5afec1` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `genre_books_book` ADD CONSTRAINT `FK_56a73217b062dfedfb221dd7eca` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `genre_books_book` DROP FOREIGN KEY `FK_56a73217b062dfedfb221dd7eca`',
    );
    await queryRunner.query(
      'ALTER TABLE `genre_books_book` DROP FOREIGN KEY `FK_0690591237ade3109687a5afec1`',
    );
    await queryRunner.query(
      'ALTER TABLE `book_genres_genre` DROP FOREIGN KEY `FK_83bd32782d44d9db3d68c3f58c1`',
    );
    await queryRunner.query(
      'ALTER TABLE `book_genres_genre` DROP FOREIGN KEY `FK_31d658e0af554165f4598158c55`',
    );
    await queryRunner.query(
      'ALTER TABLE `Book` DROP FOREIGN KEY `FK_bccb94b5569f228e3c4b9d763ab`',
    );
    await queryRunner.query(
      'ALTER TABLE `BookInstance` DROP FOREIGN KEY `FK_eed6d142dd9d4f682f2c60155ab`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_56a73217b062dfedfb221dd7ec` ON `genre_books_book`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_0690591237ade3109687a5afec` ON `genre_books_book`',
    );
    await queryRunner.query('DROP TABLE `genre_books_book`');
    await queryRunner.query(
      'DROP INDEX `IDX_83bd32782d44d9db3d68c3f58c` ON `book_genres_genre`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_31d658e0af554165f4598158c5` ON `book_genres_genre`',
    );
    await queryRunner.query('DROP TABLE `book_genres_genre`');
    await queryRunner.query('DROP TABLE `Genre`');
    await queryRunner.query('DROP TABLE `Book`');
    await queryRunner.query('DROP TABLE `author`');
    await queryRunner.query('DROP TABLE `BookInstance`');
  }
}
