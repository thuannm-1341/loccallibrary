import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { Repository } from 'typeorm';
import { GenreEntity } from '../entities/genre.entity';
import { AppDataSource } from '../configs/ormConfig';

const genreRepository: Repository<GenreEntity> =
  AppDataSource.getRepository(GenreEntity);

// Display list of all genres
export const getGenres = asyncHandler(async (req: Request, res: Response) => {
  const genres = await genreRepository.find({
    order: { name: 'ASC' },
  });
  res.render('genres/index', {
    genres,
    title: 'genre.title.listOfGenre',
  });
});

// Display create-genre form
export const getCreateGenreForm = asyncHandler(
  async (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: Get create-genre form');
  },
);

// Create a new genre
export const createGenre = asyncHandler(async (req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: Create genre');
});

// Display detail page for a specific genre
export const getGenreDetails = asyncHandler(
  async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
  },
);

// Update specific genre
export const updateGenre = asyncHandler(async (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Update genre: ${req.params.id}`);
});

// Delete specific genre
export const deleteGenre = asyncHandler(async (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Delete genre: ${req.params.id}`);
});
