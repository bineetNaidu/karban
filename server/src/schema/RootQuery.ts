import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLError,
} from 'graphql';
import jwt from 'jsonwebtoken';
import { createToken } from '../utils/createToken';
import { AuthType } from './Types/AuthType';
import { KarbanProjectType } from './Types/KarbanProjectType';
import { KarbanType } from './Types/KarbanType';
import Karban from '../models/Karban';
import KarbanProject from '../models/KarbanProject';

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

    getProjectById: {
      type: KarbanProjectType,
      args: {
        token: { type: new GraphQLNonNull(GraphQLString) },
        projectId: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args, context) {
        try {
          const { id } = jwt.decode(args.token) as { id: string };
          const userKarban = await Karban.findById(id);
          if (!userKarban) {
            throw new GraphQLError('Karban Not Found');
          }

          const project = await KarbanProject.findById(args.projectId).populate(
            'tabs'
          );
          if (!project) {
            throw new GraphQLError('Karban Project Not Found');
          }

          return project;
        } catch (e) {
          throw new GraphQLError(e.message);
        }
      },
    },

    getProjects: {
      type: new GraphQLList(KarbanProjectType),
      args: {
        token: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args) {
        try {
          const { id } = jwt.decode(args.token) as { id: string };
          const userKarban = await Karban.findById(id).populate('projects');
          if (!userKarban) {
            throw new GraphQLError('Karban Not Found');
          }

          return userKarban.projects;
        } catch (e) {
          throw new GraphQLError(e.message);
        }
      },
    },
  },
});
