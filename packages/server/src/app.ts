// ***** IMPORT *****
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import passport from 'passport';
import expressSession from 'express-session';
import connectDB from './config/db';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import apiRouter from './api';
import { createContext } from './utils/createContext';
import ExpressErrorHandler from './utils/ExpressErrorHandler';
import NotFoundError from './utils/NotFoundError';
import MongoStore from 'connect-mongo';
import cors from 'cors';

// ***** App Config *****
dotenv.config();

const app = express();

app.set('trust proxy', 1);
app.use(express.json());
app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_URL,
    credentials: true,
  })
);

/* Express-Session configuration */
app.use(
  expressSession({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      touchAfter: 24 * 60 * 60 * 30, // ? 1month
    }),
    secret: process.env.JWT_SECRET!,
    resave: false,
    saveUninitialized: true,
    name: 'KarbanSess',
    cookie: {
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      maxAge: 24 * 60 * 60 * 30,
      signed: true,
      httpOnly: true,
      // sameSite: 'lax',
    },
  })
);

/* Passport configuration */
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: Express.User, done) => done(null, user));

app.use('/api', apiRouter(passport));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => createContext(req),
});

/* Apollo GraphQL Server */
server.applyMiddleware({
  app,
  cors: {
    origin: process.env.NEXT_PUBLIC_URL,
    credentials: true,
  },
});

//! Not found page error
app.all('*', () => {
  throw new NotFoundError();
});
// ! Error Handlers
app.use(ExpressErrorHandler);

// (async () => {
connectDB().then(() => {
  const port = process.env.PORT || 4242;
  app.listen({ port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  );
});
