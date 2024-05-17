import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { GenreService } from '../services/genre.service';
import { Result, body, validationResult } from 'express-validator';
import { GenreEntity } from '../entities/genre.entity';

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
export const genreCreateGet = asyncHandler(
  async (req: Request, res: Response) => {
    res.render('genres/form', { title: 'genre.title.create' });
  },
);

// Create a new genre
export const genreCreatePost = [
  body('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage('genre.message.invalidNameLength')
    .escape(),
  asyncHandler(async (req: Request, res: Response) => {
    const errors: Result = validationResult(req);
    let genre = new GenreEntity();
    genre.name = req.body.name;
    if (!errors.isEmpty()) {
      // Render the form again with sanitized values/error messages.
      res.render('genres/form', {
        title: 'genre.title.listOfGenre',
        genre: genre,
        formErrors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      const genreExists = await genreService.findOneByName(req.body.name);
      if (genreExists) {
        // Genre exists, redirect to its detail page.
        res.redirect(genreExists.url());
      } else {
        genre = await genreService.saveGenre(genre);
        // New genre saved. Redirect to genre detail page.
        res.redirect(genre.url());
      }
    }
  }),
];

// Display detail page for a specific genre
export const getGenreDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const genre = await getGenreFromIdParam(req, res);
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

// Delete specific book
export const deleteGenreGet = asyncHandler(
  async (req: Request, res: Response) => {
    const genre = await getGenreFromIdParam(req, res);
    if (genre === null) {
      req.flash('error', 'genre.error.notFound');
      res.redirect('/genres');
    }
    res.render('genres/delete', {
      title: 'genre.title.delete',
      genre,
      books: genre?.books,
    });
  },
);

export const deleteBookPost = asyncHandler(
  async (req: Request, res: Response) => {
    const genre = await getGenreFromIdParam(req, res);
    if (genre === null) {
      req.flash('error', 'genre.error.notFound');
      res.redirect('/genres');
    }
    const books = genre?.books;
    if (books && books.length > 0) {
      res.render('genres/delete', {
        title: 'genre.title.delete',
        genre,
        books: books,
      });
      return;
    } else {
      await genreService.deleteGenre(parseInt(req.params.id));
      res.redirect('/genres');
    }
  },
);

const getGenreFromIdParam = async (
  req: Request,
  res: Response,
): Promise<GenreEntity | null> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    req.flash('error', 'genre.error.invalidParameter');
    res.redirect('/genres');
  }
  return await genreService.getGenreDetail(id);
};
