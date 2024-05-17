import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthorService } from '../services/author.service';
import { formatDate } from '../commons/utils';
import { body, validationResult } from 'express-validator';
import { AuthorEntity } from '../entities/author.entity';

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

// Create a new author
export const createAuthorGet = asyncHandler(
  async (req: Request, res: Response) => {
    res.render('authors/form', {
      title: 'author.title.create',
    });
  },
);

// Create a new author
export const createAuthorPost = [
  // Validate and sanitize fields.
  body('firstName')
    .trim()
    .isLength({ min: 3 })
    .withMessage('author.message.invalidFirstNameLength')
    .escape(),
  body('familyName')
    .trim()
    .isLength({ min: 3 })
    .withMessage('author.message.invalidFamilyNameLength')
    .escape(),
  body('dateOfBirth')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate()
    .custom((value: Date) => {
      if (value && value.getTime() > new Date().getTime()) {
        ('author.message.invalidDateOfBirth');
        return false;
      }
      return true;
    })
    .escape(),
  body('dateOfDeath')
    .optional({ checkFalsy: true })
    .toDate()
    .isISO8601()
    .custom((value: Date) => {
      if (value && value.getTime() > new Date().getTime()) {
        ('author.message.invalidDateOfDeath');
        return false;
      }
      return true;
    })
    .escape(),
  asyncHandler(async (req: Request, res: Response) => {
    const formErrors = validationResult(req);
    const { firstName, familyName, dateOfBirth, dateOfDeath } = req.body;
    if (!formErrors.isEmpty()) {
      //There are errors.Render form again with sanitized values/error messages.
      res.render('authors/form', {
        title: 'author.title.create',
        author: {
          firstName,
          familyName,
          dateOfBirth,
          dateOfDeath,
        },
        formErrors: formErrors.array(),
      });
      return;
    }
    // Handle create new AuthorEntity object and assign attribute value
    const newAuthor = new AuthorEntity();
    newAuthor.firstName = firstName;
    newAuthor.familyName = familyName;
    if (dateOfBirth) newAuthor.dateOfBirth = new Date(dateOfBirth);
    if (dateOfDeath) newAuthor.dateOfDeath = new Date(dateOfDeath);
    const author = await authorService.saveAuthor(newAuthor);
    // Redirect to author detail page.
    res.redirect(author.url());
  }),
];
// Display detail page for a specific author
export const getAuthorDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const author = await getAuthorFromIdParam(req, res);
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
export const authorDeleteGet = asyncHandler(
  async (req: Request, res: Response) => {
    const author = await getAuthorFromIdParam(req, res);
    if (author === null) {
      req.flash('error', 'author.error.notFound');
      res.redirect('/authors');
    }
    const allBooksByAuthor = author?.books;
    res.render('authors/delete', {
      title: 'author.title.delete',
      author: author,
      authorBooks: allBooksByAuthor,
      authorBirthDate: formatDate(author?.dateOfBirth),
      authorDeathDate: formatDate(author?.dateOfDeath),
    });
  },
);

export const authorDeletePost = asyncHandler(
  async (req: Request, res: Response) => {
    const author = await getAuthorFromIdParam(req, res);
    if (author === null) {
      req.flash('error', 'author.error.notFound');
      res.redirect('/authors');
    }
    const allBooksByAuthor = author?.books;
    if (allBooksByAuthor && allBooksByAuthor.length > 0) {
      // Author has books. Render in same way as for GET route.
      res.render('authors/delete', {
        title: 'author.title.delete',
        author: author,
        authorBooks: allBooksByAuthor,
        authorBirthDate: formatDate(author?.dateOfBirth),
        authorDeathDate: formatDate(author?.dateOfDeath),
      });
      return;
    } else {
      // Author has no books. Delete object and redirect to the list of authors.
      await authorService.deleteAuthor(parseInt(req.params.id));
      res.redirect('/authors');
    }
  },
);

const getAuthorFromIdParam = async (
  req: Request,
  res: Response,
): Promise<AuthorEntity | null> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    req.flash('error', 'author.error.invalidParameter');
    res.redirect('/authors');
  }
  // Get details of author and all their books
  return await authorService.getAuthorDetails(id);
};
