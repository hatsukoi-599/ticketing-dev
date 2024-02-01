import express from 'express';
import 'express-async-errors';
import { errorHandler, NotFoundError, currentUser } from '@xjtickets/common';
import cookieSession from 'cookie-session';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes';
import { createOrderRouter } from './routes/create';
import { deleteOrderRouter } from './routes/delete';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    secure: process.env.NODE_ENV !== 'test',
    signed: false,
  })
);
app.use(currentUser);
app.use(createOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
