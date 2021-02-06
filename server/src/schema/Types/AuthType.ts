import { GraphQLObjectType, GraphQLString } from 'graphql';

export const AuthType = new GraphQLObjectType({
  name: 'Auth',
  fields: {
    token: { type: GraphQLString },
  },
  description: 'Authentication meta data about the user',
});
