// ***** IMPORT *****
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

// ***** App Config *****
dotenv.config();

const app = express();

app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

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
