import { GraphQLSchema } from 'graphql';
import { Mutation } from './Mutations';
import { RootQuery } from './RootQuery';

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
