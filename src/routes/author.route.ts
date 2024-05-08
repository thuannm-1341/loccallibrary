import { Router } from 'express';
import * as authorController from '../controllers/author.controller';
const authorRouter: Router = Router();

authorRouter.get('/', authorController.getAuthors);

authorRouter.get('/create', authorController.getCreateAuthorForm);
authorRouter.post('/create', authorController.createAuthor);

authorRouter.get('/:id', authorController.getAuthorDetails);
authorRouter.put('/:id/update', authorController.updateAuthor);
authorRouter.delete('/:id/delete', authorController.deleteAuthor);

export default authorRouter;
