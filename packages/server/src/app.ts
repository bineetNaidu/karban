// ***** IMPORT *****
import connectDB from './config/db';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

// ***** App Config *****
dotenv.config();

(async () => {
  await connectDB();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: true,
    tracing: true,
    context: ({ req }) => {
      // /
    },
  });

  // The `listen` method launches a web server.
  server.listen({ port: process.env.PORT }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})();
