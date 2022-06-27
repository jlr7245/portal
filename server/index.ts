require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import session from 'express-session';
//@ts-ignore
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';


import { StatusError } from './utils';
import schema from './schema';

const PORT = process.env.PORT || 3000;

const app = express();
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(morgan('dev'));
app.use(cors());
app.use(
  session({
    secret: process.env.SECRET_KEY as string,
    resave: false,
    saveUninitialized: true,
  }),
);

// this takes care of the client so that it's served from the server
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  '/graphql',
  graphqlUploadExpress({
    maxFieldSize: 10000000,
  }),
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
  if (err instanceof StatusError && process.env.NODE_ENV !== 'production') {
    console.log(err.error);
  } else {
    console.log(err);
  }
  res.status(status).json({ err, message: err.message });
});
