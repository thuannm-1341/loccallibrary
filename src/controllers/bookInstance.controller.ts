import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { BOOK_INSTANCE_STATUS } from '../commons/contants';
import { BookInstanceService } from '../services/bookInstance.service';

const bookInstanceService = new BookInstanceService();

// Display list of all book instances
export const getBookInstances = asyncHandler(
  async (req: Request, res: Response) => {
    const bookInstances = await bookInstanceService.getAllBookInstances();
    res.render('book-instances/index', {
      bookInstances,
      title: 'bookInstance.title.listOfBookInstance',
      BOOK_INSTANCE_STATUS,
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
    res.send(`NOT IMPLEMENTED: Book instance detail: ${req.params.id}`);
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
