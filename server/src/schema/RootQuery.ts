import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLError,
} from 'graphql';
import Karban from '../models/Karban';
import { createToken } from '../utils/createToken';
import { AuthType } from './Types/AuthType';
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

    login: {
      type: AuthType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args) {
        try {
          const karbanUser = Karban.login(args.username, args.password);
          const token = createToken(karbanUser._id);
          return token;
        } catch (e) {
          throw new GraphQLError(e.message);
        }
      },
    },
  },
});
