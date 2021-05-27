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

// ***** App Config *****
dotenv.config();

const app = express();

app.use(express.json());

/* Express-Session configuration */
app.use(
  expressSession({
    secret: process.env.JWT_SECRET!,
    resave: false,
    saveUninitialized: true,
    name: 'KarbanSess',
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 60 * 24,
      signed: true,
      httpOnly: true,
      sameSite: 'lax',
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
server.applyMiddleware({ app });

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
