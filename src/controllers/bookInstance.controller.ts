import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { BOOK_INSTANCE_STATUS } from '../commons/contants';
import { BookInstanceService } from '../services/bookInstance.service';
import { formatDate } from '../commons/utils';

const bookInstanceService = new BookInstanceService();

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
export const getCreateBookInstanceForm = asyncHandler(
  async (req: Request, res: Response) => {
    res.send('NOT IMPLEMENT: Get create-author form');
  },
);

// Create book instance
export const createBookInstance = asyncHandler(
  async (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: Create book instance');
  },
);

// Display detail page for a specific book instance
export const getBookInstanceDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      req.flash('error', 'bookInstance.error.invalidParameter');
      res.redirect('/book-instances');
    }
    const bookInstance = await bookInstanceService.getBookInstanceDetail(id);
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
export const deleteBookInstance = asyncHandler(
  async (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: Delete book instance: ${req.params.id}`);
  },
);
