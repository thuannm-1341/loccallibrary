// routes/index.ts
import { Router, Request, Response } from 'express';
import authorRouter from './author.route';
import bookRouter from './book.route';
import bookInstanceRouter from './bookInstance.route';
import genreRouter from './genre.route';

const router: Router = Router();
router.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Express' });
});

router.use('/authors', authorRouter);
router.use('/books', bookRouter);
router.use('/book-instances', bookInstanceRouter);
router.use('/genres', genreRouter);

export default router;
