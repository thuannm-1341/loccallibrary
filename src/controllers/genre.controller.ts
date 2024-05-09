import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { GenreService } from '../services/genre.service';

const genreService = new GenreService();

// Display list of all genres
export const getGenres = asyncHandler(async (req: Request, res: Response) => {
  const genres = await genreService.getAllGenres();
  const errors = req.flash('error');
  res.render('genres/index', {
    genres,
    title: 'genre.title.listOfGenre',
    errors,
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
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      req.flash('error', 'genre.error.invalidParameter');
      res.redirect('/genres');
    }
    const genre = await genreService.getGenreDetail(id);
    if (genre === null) {
      req.flash('error', 'genre.error.notFound');
      res.redirect('/genres');
    }
    res.render('genres/show', {
      genre,
      genreBooks: genre?.books,
      title: 'genre.title.detail',
    });
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
