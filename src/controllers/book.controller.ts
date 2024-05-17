import { AuthorService } from './../services/author.service';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { BookService } from '../services/book.service';
import { GenreService } from '../services/genre.service';
import { body, validationResult } from 'express-validator';
import { BookEntity } from '../entities/book.entity';

const bookService = new BookService();
const authorService = new AuthorService();
const genreService = new GenreService();

export const index = asyncHandler(async (req: Request, res: Response) => {
  const generalData = await bookService.getLibraryGeneralData();
  res.render('index', {
    title: 'home.title',
    numBooks: generalData.numBooks,
    numBookInstances: generalData.numBookInstances,
    numAvailableBookInstances: generalData.availableBookInstances,
    numAuthors: generalData.numAuthors,
    numGenres: generalData.numGenres,
  });
});

// Display list of all books
export const getBooks = asyncHandler(async (req: Request, res: Response) => {
  const books = await bookService.getAllBooks();
  const errors = req.flash('error');
  res.render('books/index', { books, title: 'book.title.listOfBook', errors });
});

// Display detail page for a specific book
export const getBookDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const book = await getBookFromIdParam(req, res);
    if (book === null) {
      req.flash('error', 'book.error.notFound');
      res.redirect('/books');
    }
    res.render('books/show', {
      book,
      bookInstances: book?.bookInstances,
      bookGenres: book?.genres,
      bookInstanceStatuses: book?.bookInstances,
      title: 'book.title.detail',
    });
  },
);

// Update specific book
export const bookUpdateGet = asyncHandler(
  async (req: Request, res: Response) => {
    const book = await getBookFromIdParam(req, res);
    if (book === null) {
      req.flash('error', 'book.error.notFound');
      res.redirect('/books');
    }
    const authors = (await authorService.getAllAuthors())[0];
    const genres = await genreService.getAllGenres();
    res.render('books/form', {
      title: 'book.title.update',
      authors,
      genres,
      book,
    });
  },
);

export const bookUpdatePost = [
  // Validate and sanitize fields.
  body('title')
    .trim()
    .isLength({ min: 3 })
    .withMessage('book.message.invalidTitleLength')
    .escape(),
  body('author', 'Author must not be empty.')
    .exists()
    .withMessage('book.message.invalidAuthor')
    .escape(),
  body('summary')
    .trim()
    .isLength({ min: 3 })
    .withMessage('book.message.invalidSummaryLength')
    .escape(),
  body('isbn')
    .trim()
    .isLength({ min: 3 })
    .withMessage('book.message.invalidIsbnLength')
    .escape(),
  body('genre.*').escape(),
  asyncHandler(async (req: Request, res: Response) => {
    const formErrors = validationResult(req);
    const book = await getBookFromIdParam(req, res);
    if (book === null) {
      req.flash('error', 'book.error.notFound');
      res.redirect('/books');
    }
    const genresArray = req.body.genres;
    let genreIds = [];
    if (genresArray != undefined) {
      genreIds = genresArray.map((item: string) => parseInt(item));
    }
    const author = await authorService.getAuthorDetails(req.body.author);
    // Handle create new Book object and assign attribute value
    const newBook = new BookEntity();
    newBook.id = parseInt(req.params.id);
    newBook.title = req.body.title;
    if (author !== null) {
      newBook.author = author;
    }
    newBook.summary = req.body.summary;
    newBook.isbn = req.body.isbn;
    // Handle find updating book genres
    newBook.genres = await genreService.findManyById(genreIds);
    if (!formErrors.isEmpty()) {
      //There are errors.Render form again with sanitized values/error messages.
      //Get all authors and genres for form
      const authors = (await authorService.getAllAuthors())[0];
      const genres = await genreService.getAllGenres();
      res.render('books/form', {
        title: 'book.title.update',
        authors,
        genres,
        book,
        formErrors: formErrors.array(),
      });
      return;
    }
    // Data from form is valid. Update the record and relations corresponding
    const updatedBook = await bookService.saveBook(newBook);
    // Redirect to book detail page.
    res.redirect(updatedBook.url());
  }),
];

// Create new book
export const bookCreateGet = asyncHandler(
  async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const authors = (await authorService.getAllAuthors())[0];
    const genres = await genreService.getAllGenres();
    res.render('books/createForm', {
      title: 'book.title.create',
      authors,
      genres,
    });
  },
);

export const bookCreatePost = [
  // Validate and sanitize fields.
  body('title')
    .trim()
    .isLength({ min: 3 })
    .withMessage('book.message.invalidTitleLength')
    .escape(),
  body('author', 'Author must not be empty.')
    .exists()
    .withMessage('book.message.invalidAuthor')
    .escape(),
  body('summary')
    .trim()
    .isLength({ min: 3 })
    .withMessage('book.message.invalidSummaryLength')
    .escape(),
  body('isbn')
    .trim()
    .isLength({ min: 3 })
    .withMessage('book.message.invalidIsbnLength')
    .escape(),
  body('genre.*').escape(),
  asyncHandler(async (req: Request, res: Response) => {
    const formErrors = validationResult(req);
    const genresArray = req.body.genres;
    let genreIds = [];
    if (genresArray != undefined) {
      genreIds = genresArray.map((item: string) => parseInt(item));
    }
    const author = await authorService.getAuthorDetails(req.body.author);
    // Handle create new Book object and assign attribute value
    const newBook = new BookEntity();
    newBook.title = req.body.title;
    if (author !== null) {
      newBook.author = author;
    }
    newBook.summary = req.body.summary;
    newBook.isbn = req.body.isbn;
    // Handle find updating book genres
    newBook.genres = await genreService.findManyById(genreIds);
    if (!formErrors.isEmpty()) {
      //There are errors.Render form again with sanitized values/error messages.
      //Get all authors and genres for form
      const authors = (await authorService.getAllAuthors())[0];
      const genres = await genreService.getAllGenres();
      res.render('books/createForm', {
        book: newBook,
        title: 'book.title.create',
        authors,
        genres,
        formErrors: formErrors.array(),
      });
      return;
    }
    // Data from form is valid. Update the record and relations corresponding
    const book = await bookService.saveBook(newBook);
    // Redirect to book detail page.
    res.redirect(book.url());
  }),
];

// Delete specific book
export const deleteBookGet = asyncHandler(
  async (req: Request, res: Response) => {
    const book = await getBookFromIdParam(req, res);
    if (book === null) {
      req.flash('error', 'book.error.notFound');
      res.redirect('/books');
    }
    const bookInstances = book?.bookInstances;
    res.render('books/delete', {
      title: 'book.title.delete',
      book,
      bookInstances,
      bookGenres: book?.genres,
    });
  },
);

export const deleteBookPost = asyncHandler(
  async (req: Request, res: Response) => {
    const book = await getBookFromIdParam(req, res);
    if (book === null) {
      req.flash('error', 'book.error.notFound');
      res.redirect('/books');
    }
    const bookInstances = book?.bookInstances;
    if (bookInstances && bookInstances.length > 0) {
      // book has book instances. Render in same way as for GET route.
      res.render('books/delete', {
        title: 'book.title.delete',
        book,
        bookInstances,
        bookGenres: book?.genres,
      });
      return;
    } else {
      // Books has no book instances. Delete object and redirect to the list of books.
      await bookService.deleteBook(parseInt(req.params.id));
      res.redirect('/books');
    }
  },
);

const getBookFromIdParam = async (
  req: Request,
  res: Response,
): Promise<BookEntity | null> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    req.flash('error', 'book.error.invalidParameter');
    res.redirect('/books');
  }
  return await bookService.getBookDetail(id);
};
