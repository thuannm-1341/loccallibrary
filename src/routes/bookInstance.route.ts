import { Router } from 'express';
import * as bookInstanceController from '../controllers/bookInstance.controller';
const bookInstanceRouter: Router = Router();

bookInstanceRouter.get('/', bookInstanceController.getBookInstances);

bookInstanceRouter.get(
  '/create',
  bookInstanceController.getCreateBookInstanceForm,
);
bookInstanceRouter.post('/create', bookInstanceController.createBookInstance);

bookInstanceRouter.get('/:id', bookInstanceController.getBookInstanceDetails);
bookInstanceRouter.put(
  '/:id/update',
  bookInstanceController.updateBookInstance,
);
bookInstanceRouter.delete(
  '/:id/delete',
  bookInstanceController.deleteBookInstance,
);

export default bookInstanceRouter;
