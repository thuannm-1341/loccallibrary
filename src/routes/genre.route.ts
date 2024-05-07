import { Router } from 'express';
import * as genreController from '../controllers/genre.controller';
const genreRouter: Router = Router();

genreRouter.get('/', genreController.getGenres);

genreRouter.get('/create', genreController.getCreateGenreForm);
genreRouter.post('/create', genreController.createGenre);

genreRouter.get('/:id', genreController.getGenreDetails);
genreRouter.put('/:id/update', genreController.updateGenre);
genreRouter.delete('/:id/delete', genreController.deleteGenre);

export default genreRouter;
