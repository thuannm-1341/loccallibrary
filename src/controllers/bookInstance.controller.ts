import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

// Display list of all book instances
export const getBookInstances = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Get list of book instances');
  },
);

// Display create-bookInstance form
export const getCreateBookInstanceForm = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENT: Get create-author form');
  },
);

// Create book instance
export const createBookInstance = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Create book instance');
  },
);

// Display detail page for a specific book instance
export const getBookInstanceDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Book instance detail: ${req.params.id}`);
  },
);

// Update specific book instance
export const updateBookInstance = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Update book instance: ${req.params.id}`);
  },
);

// Delete specific book instance
export const deleteBookInstance = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Delete book instance: ${req.params.id}`);
  },
);
