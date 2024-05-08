// routes/index.ts
import { Router } from 'express';
import authorRouter from './author.route';
import bookRouter from './book.route';
import bookInstanceRouter from './bookInstance.route';
import genreRouter from './genre.route';
import { index } from '../controllers/book.controller';

const router: Router = Router();
router.get('/', index);

router.use('/authors', authorRouter);
router.use('/books', bookRouter);
router.use('/book-instances', bookInstanceRouter);
router.use('/genres', genreRouter);

export default router;
