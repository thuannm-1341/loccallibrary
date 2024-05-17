import { Router } from 'express';
import * as bookController from '../controllers/book.controller';
const bookRouter: Router = Router();

bookRouter.get('/', bookController.getBooks);

bookRouter.get('/create', bookController.bookCreateGet);
bookRouter.post('/create', bookController.bookCreatePost);

bookRouter.get('/:id', bookController.getBookDetails);
bookRouter.get('/:id/update', bookController.bookUpdateGet);
bookRouter.post('/:id/update', bookController.bookUpdatePost);
bookRouter.get('/:id/delete', bookController.deleteBookGet);
bookRouter.post('/:id/delete', bookController.deleteBookPost);

export default bookRouter;
