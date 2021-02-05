import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLError,
} from 'graphql';
import Karban from '../models/Karban';
import { KarbanType } from './Types/KarbanType';

export const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    karbans: {
      type: new GraphQLList(KarbanType),
      async resolve() {
        const karbans = await Karban.find({}).populate('projects').exec();
        return karbans;
      },
    },

    loginToKarban: {
      type: KarbanType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args) {
        const karban = await Karban.findOne({
          username: args.username,
          password: args.password,
        }).populate('projects');
        // .exec();
        if (!karban) {
          throw new GraphQLError('The Karban User Does not Exist!');
        }
        return karban;
      },
    },
  },
});
