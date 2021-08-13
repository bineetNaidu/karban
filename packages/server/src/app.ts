// ***** IMPORT *****
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import expressSession from 'express-session';
import connectDB from './config/db';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import ExpressErrorHandler from './utils/ExpressErrorHandler';
import NotFoundError from './utils/NotFoundError';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import User from './models/User';

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

app.use(
  expressSession({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    name: 'KarbanSess',
    cookie: {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // ? 1 week
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    },
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => ({
    res,
    req,
    hasAuth: !!(req.session as any).userId,
    getUser: async () => {
      return User.findById((req.session as any).userId);
    },
  }),
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
