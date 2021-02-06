import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLError,
} from 'graphql';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import Karban from '../models/Karban';
import KarbanProject from '../models/KarbanProject';
import KarbanProjectTab from '../models/KarbanProjectTab';
import { KarbanProjectTabCardType } from './Types/KarbanProjectTabCardType';
import { KarbanProjectTabType } from './Types/KarbanProjectTabType';
import { KarbanProjectType } from './Types/KarbanProjectType';
import { KarbanType } from './Types/KarbanType';
import { createToken } from '../utils/createToken';

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signUp: {
      type: KarbanType,
      args: {
        avatar: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const karban = Karban.build({
          avatar: args.avatar,
          email: args.email,
          password: args.password,
          username: args.username,
        });
        await karban.save();
        const token = createToken(karban._id);
        return { token };
      },
    },

    createProject: {
      type: KarbanProjectType,
      args: {
        token: { type: new GraphQLNonNull(GraphQLString) },
        projectName: { type: new GraphQLNonNull(GraphQLString) },
        projectDescription: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args) {
        const { id } = jwt.decode(args.token) as { id: string };
        const karban = await Karban.findOne({
          _id: id,
        });
        if (!karban) {
          throw new GraphQLError('The Karban User Does not Exist!');
        }
        const karbanProject = KarbanProject.build({
          projectName: args.projectName,
          projectDescription: args.projectDescription,
        });
        await karbanProject.save();

        karban.projects.push(karbanProject._id);
        await karban.save();

        return karbanProject;
      },
    },

    createTab: {
      type: KarbanProjectTabType,
      args: {
        karbanProjectId: { type: new GraphQLNonNull(GraphQLID) },
        tabName: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args) {
        const karbanProject = await KarbanProject.findOne({
          _id: args.karbanProjectId,
        });
        if (!karbanProject) {
          throw new GraphQLError('The Karban Project Does not Exist!');
        }
        const tab = KarbanProjectTab.build({
          tabId: uuid(),
          tabName: args.tabName,
        });
        await tab.save();

        karbanProject.tabs.push(tab.tabId);
        await karbanProject.save();

        return tab;
      },
    },

    createCard: {
      type: KarbanProjectTabCardType,
      args: {
        tabId: { type: new GraphQLNonNull(GraphQLString) },
        cardBody: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args) {
        try {
          const cardId = uuid();
          const cards = await KarbanProjectTab.buildCard(args.tabId, {
            cardBody: args.cardBody,
            cardId,
          });

          const card = cards.filter((c) => c.cardId === cardId);

          return card[0];
        } catch (e) {
          throw new GraphQLError(e.message);
        }
      },
    },

    deleteKarban: {
      type: KarbanType,
      args: {
        karbanId: { type: new GraphQLNonNull(GraphQLID) },
      },
      description: 'Delete A Karban Project',
      async resolve(_, args) {
        try {
          await Karban.findByIdAndRemove(args.karbanId);
        } catch (e) {
          throw new GraphQLError(e.message);
        }
      },
    },
  },
});
