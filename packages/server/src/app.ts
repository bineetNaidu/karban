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

// ***** App Config *****
dotenv.config();

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => createContext(req),
});

app.use(express.json());

/* Express-Session configuration */
app.use(
  expressSession({
    secret: process.env.JWT_SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: undefined,
      signed: true,
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

/* Apollo GraphQL Server */
server.applyMiddleware({ app });

// (async () => {
connectDB().then(() => {
  const port = process.env.PORT || 4242;
  app.listen({ port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  );
});
