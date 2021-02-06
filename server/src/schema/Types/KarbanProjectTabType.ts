import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLError,
  GraphQLID,
} from 'graphql';
import KarbanProjectTab from '../../models/KarbanProjectTab';
import { KarbanProjectTabCardType } from './KarbanProjectTabCardType';

export const KarbanProjectTabType = new GraphQLObjectType({
  name: 'KarbanProjectTab',
  fields: () => ({
    _id: { type: GraphQLID },
    tabId: { type: GraphQLString },
    tabName: { type: GraphQLString },
    cards: {
      type: new GraphQLList(KarbanProjectTabCardType),
      resolve: async (parent, args) => {
        const tab = await KarbanProjectTab.findOne({ tabId: parent.tabId });
        if (!tab) {
          throw new GraphQLError('Karban Project Tab Not Found');
        }
        return tab.cards;
      },
    },
  }),
});
