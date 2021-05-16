// ***** IMPORT *****
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/db';
import dotenv from 'dotenv';
import NotFoundError from './utils/NotFoundError';
import ExpressErrorHandler from './utils/ExpressErrorHandler';
import { graphqlHTTP } from 'express-graphql';
import 'express-async-errors';

// ***** App Config *****
dotenv.config();

const app = express();
connectDB();

// ***** Middlewares *****
app.use(cors());
helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: [],
    connectSrc: ["'self'"],
    scriptSrc: ["'unsafe-inline'", "'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    workerSrc: ["'self'", 'blob:'],
    objectSrc: [],
    imgSrc: ["'self'", 'blob:', 'data:'],
    fontSrc: ["'self'"],
  },
});

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    pretty: true,
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
