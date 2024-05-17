import { BookService } from './../services/book.service';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { BOOK_INSTANCE_STATUS } from '../commons/contants';
import { BookInstanceService } from '../services/bookInstance.service';
import { formatDate } from '../commons/utils';
import { body, validationResult } from 'express-validator';
import i18next from 'i18next';
import { BookInstanceEntity } from '../entities/bookInstance.entity';

const bookInstanceService = new BookInstanceService();
const bookService = new BookService();

// Display list of all book instances
export const getBookInstances = asyncHandler(
  async (req: Request, res: Response) => {
    const [bookInstances, dueDates] =
      await bookInstanceService.getAllBookInstances();
    const errors = req.flash('error');
    res.render('book-instances/index', {
      bookInstances,
      dueDates,
      title: 'bookInstance.title.listOfBookInstance',
      BOOK_INSTANCE_STATUS,
      errors,
    });
  },
);

// Display create-bookInstance form
export const createBookInstanceGet = asyncHandler(
  async (req: Request, res: Response) => {
    const books = await bookService.getAllBooks();
    const statuses = BOOK_INSTANCE_STATUS;
    res.render('book-instances/form', {
      books,
      statuses,
      title: 'bookInstance.title.create',
    });
  },
);

export const createBookInstancePost = [
  body('imprint')
    .trim()
    .isLength({ min: 3 })
    .withMessage(() => String(i18next.t('bookInstance.message.invalidImprint')))
    .escape(),
  body('dueBack')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate()
    .withMessage(() => String(i18next.t('bookInstance.message.invalidDueBack')))
    .escape(),
  body('status')
    .trim()
    .isLength({ min: 1 })
    .withMessage(() => String(i18next.t('bookInstance.message.invalidStatus')))
    .escape(),
  asyncHandler(async (req: Request, res: Response) => {
    const books = await bookService.getAllBooks();
    const formErrors = validationResult(req);
    const { bookId, imprint, dueBack, status } = req.body;
    if (!formErrors.isEmpty()) {
      //There are errors.Render form again with sanitized values/error messages.
      res.render('book-instances/form', {
        title: 'bookInstance.title.create',
        books,
        statuses: BOOK_INSTANCE_STATUS,
        bookInstance: {
          bookId,
          imprint,
          dueBack,
          status,
        },
        formErrors: formErrors.array(),
      });
      return;
    }
    // Handle create new AuthorEntity object and assign attribute value
    const newBookInstance = new BookInstanceEntity();
    const book = await bookService.getBookDetail(parseInt(bookId));
    if (book === null) {
      //There are errors.Render form again with sanitized values/error messages.
      res.render('book-instances/form', {
        title: 'bookInstance.title.create',
        books,
        statuses: BOOK_INSTANCE_STATUS,
        bookInstance: {
          bookId,
          imprint,
          dueBack,
          status,
        },
        formErrors: formErrors.array(),
      });
      return;
    }
    newBookInstance.book = book;
    newBookInstance.imprint = imprint;
    newBookInstance.dueBack = new Date(dueBack);
    newBookInstance.status = status;
    const bookInstance = await bookInstanceService.saveBookInstance(
      newBookInstance,
    );
    // Redirect to author detail page.
    res.redirect(bookInstance.url());
  }),
];

// Create book instance
export const createBookInstance = asyncHandler(
  async (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: Create book instance');
  },
);

// Display detail page for a specific book instance
export const getBookInstanceDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const bookInstance = await getBookInstanceFromIdParam(req, res);
    if (bookInstance === null) {
      req.flash('error', 'bookInstance.error.notFound');
      res.redirect('/book-instances');
    }
    res.render('book-instances/show', {
      bookInstance,
      dueBack: formatDate(bookInstance?.dueBack),
      book: bookInstance?.book,
      title: 'bookInstance.title.detail',
    });
  },
);

// Update specific book instance
export const updateBookInstance = asyncHandler(
  async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: Update book instance: ${req.params.id}`);
  },
);

// Delete specific book instance
export const bookInstanceDeletePost = asyncHandler(
  async (req: Request, res: Response) => {
    const bookInstance = await getBookInstanceFromIdParam(req, res);
    if (bookInstance === null) {
      req.flash('error', 'bookInstance.error.notFound');
      res.redirect('/book-instances');
    }
    await bookInstanceService.deleteBookInstance(parseInt(req.params.id));
    res.redirect('/book-instances');
  },
);

const getBookInstanceFromIdParam = async (
  req: Request,
  res: Response,
): Promise<BookInstanceEntity | null> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    req.flash('error', 'author.error.invalidParameter');
    res.redirect('/book-instances');
  }
  return await bookInstanceService.getBookInstanceDetail(id);
};
