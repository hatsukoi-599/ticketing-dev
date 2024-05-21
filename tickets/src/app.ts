import express from 'express';
import 'express-async-errors';
import { errorHandler, NotFoundError, currentUser } from '@xjtickets/common';
import cookieSession from 'cookie-session';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';
import { createTicketRouter } from './routes/create-ticket';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    secure: false,
    signed: false,
  })
);
app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
