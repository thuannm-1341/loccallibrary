import { Router } from 'express';
import * as genreController from '../controllers/genre.controller';
const genreRouter: Router = Router();

genreRouter.get('/', genreController.getGenres);

genreRouter.get('/create', genreController.genreCreateGet);
genreRouter.post('/create', genreController.genreCreatePost);

genreRouter.get('/:id', genreController.getGenreDetails);
genreRouter.put('/:id/update', genreController.updateGenre);
genreRouter.get('/:id/delete', genreController.deleteGenreGet);
genreRouter.post('/:id/delete', genreController.deleteBookPost);

export default genreRouter;
