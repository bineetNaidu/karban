import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import Karban from '../../models/Karban';
import { KarbanProjectType } from './KarbanProjectType';

export const KarbanType = new GraphQLObjectType({
  name: 'Karban',
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    avatar: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    projects: {
      type: new GraphQLList(KarbanProjectType),
      resolve: async (parent, args) => {
        const karban = await Karban.findById(parent._id).populate('projects');
        return karban?.projects;
      },
    },
  }),
});
