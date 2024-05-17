import { Router } from 'express';
import * as bookInstanceController from '../controllers/bookInstance.controller';
const bookInstanceRouter: Router = Router();

bookInstanceRouter.get('/', bookInstanceController.getBookInstances);

bookInstanceRouter.get('/create', bookInstanceController.createBookInstanceGet);
bookInstanceRouter.post(
  '/create',
  bookInstanceController.createBookInstancePost,
);

bookInstanceRouter.get('/:id', bookInstanceController.getBookInstanceDetails);
bookInstanceRouter.put(
  '/:id/update',
  bookInstanceController.updateBookInstance,
);
bookInstanceRouter.post(
  '/:id/delete',
  bookInstanceController.bookInstanceDeletePost,
);

export default bookInstanceRouter;
