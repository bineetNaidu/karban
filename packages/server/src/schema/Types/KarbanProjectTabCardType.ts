import { GraphQLObjectType, GraphQLString } from 'graphql';

export const KarbanProjectTabCardType = new GraphQLObjectType({
  name: 'KarbanProjectTabCard',
  fields: () => ({
    cardId: { type: GraphQLString },
    cardBody: { type: GraphQLString },
  }),
});
