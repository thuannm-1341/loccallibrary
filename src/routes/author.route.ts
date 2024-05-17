import { Router } from 'express';
import * as authorController from '../controllers/author.controller';
const authorRouter: Router = Router();

authorRouter.get('/', authorController.getAuthors);

authorRouter.get('/create', authorController.createAuthorGet);
authorRouter.post('/create', authorController.createAuthorPost);

authorRouter.get('/:id', authorController.getAuthorDetails);
authorRouter.put('/:id/update', authorController.updateAuthor);
authorRouter.get('/:id/delete', authorController.authorDeleteGet);
authorRouter.post('/:id/delete', authorController.authorDeletePost);

export default authorRouter;
