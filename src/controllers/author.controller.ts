import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

// Display list of all authors
export const getAuthors = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENT: Author list');
  },
);

// Display create-author form
export const getCreateAuthorForm = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENT: Get create-author form');
  },
);

// Create a new author
export const createAuthor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENT: Create author');
  },
);

// Display detail page for a specific author
export const getAuthorDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENT: Author detail: ${req.params.id}`);
  },
);

// Update specific author
export const updateAuthor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENT: Update author: ${req.params.id}`);
  },
);

// Delete specific author
export const deleteAuthor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENT: Delete author: ${req.params.id}`);
  },
);
