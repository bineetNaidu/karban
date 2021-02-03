// ***** IMPORT *****
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import logger from 'morgan';
import connectDB from './config/db';
import dotenv from 'dotenv';
import NotFoundError from './utils/NotFoundError';
import ExpressErrorHandler from './utils/ExpressErrorHandler';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import 'express-async-errors';

// ***** App Config *****
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
connectDB();

// ***** Middlewares *****
app.use(express.json());
app.use(logger('dev'));
app.use(cors());
// TODO: Fix Helmet permission issue on GraphiQL
// app.use(helmet());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

//! Not found page error
app.all('*', () => {
  throw new NotFoundError();
});
// ! Error Handlers
app.use(ExpressErrorHandler);

// **** Listeners ****
app.listen(process.env.PORT || 4242, () => {
  console.log('-----------------------------------------');
  console.log('>>>>>>> KARBAN SERVER HAS STARTED <<<<<<<<');
  console.log('-----------------------------------------');
});
