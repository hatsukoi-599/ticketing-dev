import express from 'express';
import { currentUserRouter } from './routes/current-user';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import 'express-async-errors';

const app = express();
app.use(express.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});