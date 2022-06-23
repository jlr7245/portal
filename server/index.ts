require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';

import { StatusError } from './utils';
import schema from './schema';

const PORT = process.env.PORT || 3000;

const app = express();
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(morgan('dev'));
app.use(cors());

// this takes care of the gql server
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  '/graphql',
  // something here for auth,
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.use('*', (_req, _res, _next) => {
  throw new StatusError(404, 'Not found');
});

app.use((err: StatusError | Error, _req: Request, res: Response, _next: NextFunction) => {
  const status = err instanceof StatusError ? err.status : 500;
  res.status(status).json({ err, message: err.message });
});
