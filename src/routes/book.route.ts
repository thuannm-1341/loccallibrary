import { Router } from 'express';
import * as bookController from '../controllers/book.controller';
const bookRouter: Router = Router();

bookRouter.get('/', bookController.getBooks);

bookRouter.get('/create', bookController.getCreateBookForm);
bookRouter.post('/create', bookController.createBook);

bookRouter.get('/:id', bookController.getBookDetails);
bookRouter.put('/:id/update', bookController.updateBook);
bookRouter.delete('/:id/delete', bookController.deleteBook);

export default bookRouter;
