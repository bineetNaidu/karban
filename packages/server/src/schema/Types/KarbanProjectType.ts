import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLError,
} from 'graphql';
import KarbanProject from '../../models/KarbanProject';
import { KarbanProjectTabType } from './KarbanProjectTabType';

export const KarbanProjectType = new GraphQLObjectType({
  name: 'KarbanProject',
  fields: () => ({
    _id: { type: GraphQLID },
    projectName: { type: GraphQLString },
    projectDescription: { type: GraphQLString },
    tabs: {
      type: new GraphQLList(KarbanProjectTabType),
      resolve: async (parent, args) => {
        const karbanProject = await KarbanProject.findOne({
          _id: parent._id,
        }).populate('tabs');
        if (!karbanProject) {
          throw new GraphQLError('Karban Project Not Found');
        }
        const tabs = karbanProject.tabs;
        return tabs;
      },
    },
  }),
});
