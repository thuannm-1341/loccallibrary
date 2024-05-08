import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import path from 'path';
import logger from 'morgan';
import * as dotenv from 'dotenv';
import { AppDataSource } from './configs/ormConfig';
import router from './routes';
dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use('/', router);
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500);
  res.render('error');
});
//...
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

AppDataSource.initialize()
  .then(() => {
    console.log('Database initialized');
  })
  .catch(error => console.log('Database connect failed: ', error));
