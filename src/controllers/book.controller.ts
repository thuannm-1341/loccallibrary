import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { BookService } from '../services/book.service';

const bookService = new BookService();

export const index = asyncHandler(async (req: Request, res: Response) => {
  const generalData = await bookService.getLibraryGeneralData();
  res.render('index', {
    title: 'home.title',
    numBooks: generalData.numBooks,
    numBookInstances: generalData.numBookInstances,
    numAvailableBookInstances: generalData.availableBookInstances, // count available bookInstance
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

// Display create-book form
export const getCreateBookForm = asyncHandler(
  async (req: Request, res: Response) => {
    res.send('NOT IMPLEMENT: Get create-book form');
  },
);

// Create a new book
export const createBook = asyncHandler(async (req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: Create book');
});

// Display detail page for a specific book
export const getBookDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      req.flash('error', 'book.error.invalidParameter');
      res.redirect('/books');
    }
    const book = await bookService.getBookDetail(id);
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
export const updateBook = asyncHandler(async (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Update book: ${req.params.id}`);
});

// Delete specific book
export const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Delete book: ${req.params.id}`);
});
