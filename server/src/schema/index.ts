import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} from 'graphql';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    greet: {
      type: GraphQLString,
      resolve() {
        return 'Hello World';
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
