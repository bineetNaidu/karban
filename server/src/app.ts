// ***** IMPORT *****
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import logger from 'morgan';
import connectDB from './config/db';
import dotenv from 'dotenv';
import NotFoundError from './utils/NotFoundError';
import ExpressErrorHandler from './utils/ExpressErrorHandler';
import 'express-async-errors';

//* Routers
import karbanRoutes from './routes';

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
app.use(helmet());

// ***** Unmount Routes *****
app.use('/api/', karbanRoutes);

//! Not found page error
app.all('*', () => {
  throw new NotFoundError();
});
// ! Error Handlers
app.use(ExpressErrorHandler);

// **** Listeners ****
app.listen(process.env.PORT || 4242, () => {
  console.log('-----------------------------------------');
  console.log('>>>>>>> API SERVER HAS STARTED <<<<<<<<');
  console.log('-----------------------------------------');
});
