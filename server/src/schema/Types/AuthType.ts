import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

export const AuthType = new GraphQLObjectType({
  name: 'Auth',
  fields: {
    token: { type: GraphQLString },
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    avatar: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  description: 'Authentication meta data about the user',
});
