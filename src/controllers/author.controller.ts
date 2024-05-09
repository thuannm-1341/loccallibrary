import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthorService } from '../services/author.service';
import { formatDate } from '../commons/utils';

const authorService = new AuthorService();

// Display list of all authors
export const getAuthors = asyncHandler(async (req: Request, res: Response) => {
  const [authors, authorBirthDates, authorDeathDates] =
    await authorService.getAllAuthors();
  const errors = req.flash('error');
  res.render('authors/index', {
    authors,
    authorBirthDates,
    authorDeathDates,
    title: 'author.title.listOfAuthor',
    errors,
  });
});

// Display create-author form
export const getCreateAuthorForm = asyncHandler(
  async (req: Request, res: Response) => {
    res.send('NOT IMPLEMENT: Get create-author form');
  },
);

// Create a new author
export const createAuthor = asyncHandler(
  async (req: Request, res: Response) => {
    res.send('NOT IMPLEMENT: Create author');
  },
);

// Display detail page for a specific author
export const getAuthorDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      req.flash('error', 'author.error.invalidParameter');
      res.redirect('/authors');
    }
    const author = await authorService.getAuthorDetails(id);
    if (author === null) {
      req.flash('error', 'author.error.notFound');
      res.redirect('/authors');
    }
    res.render('authors/show', {
      author,
      authorBirthDate: formatDate(author?.dateOfBirth),
      authorDeathDate: formatDate(author?.dateOfDeath),
      authorBooks: author?.books,
      title: 'author.title.detail',
    });
  },
);

// Update specific author
export const updateAuthor = asyncHandler(
  async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENT: Update author: ${req.params.id}`);
  },
);

// Delete specific author
export const deleteAuthor = asyncHandler(
  async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENT: Delete author: ${req.params.id}`);
  },
);
