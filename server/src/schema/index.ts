import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLError,
  GraphQLNonNull,
} from 'graphql';
import Karban from '../models/Karban';
import KarbanProject from '../models/KarbanProject';
import KarbanProjectTab from '../models/KarbanProjectTab';
import { v4 as uuid } from 'uuid';

const KarbanProjectTabCardType = new GraphQLObjectType({
  name: 'KarbanProjectTabCard',
  fields: () => ({
    cardId: { type: GraphQLString },
    cardBody: { type: GraphQLString },
  }),
});

const KarbanProjectTabType = new GraphQLObjectType({
  name: 'KarbanProjectTab',
  fields: () => ({
    tabId: { type: GraphQLString },
    tabName: { type: GraphQLString },
    cards: {
      type: new GraphQLList(KarbanProjectTabCardType),
      resolve: async (parent, args) => {
        const karbanProject = await KarbanProject.findOne({
          _id: parent._id,
        }).populate('tabs');
        if (!karbanProject) {
          throw new GraphQLError('Karban Project Not Found');
        }
        const cards = karbanProject.tabs.map((t: any) => t.cards);
        return cards;
      },
    },
  }),
});

const KarbanProjectType = new GraphQLObjectType({
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

const KarbanType = new GraphQLObjectType({
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

const RootQuery = new GraphQLObjectType({
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

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signUpToKarban: {
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
        return karban;
      },
    },

    createProject: {
      type: KarbanProjectType,
      args: {
        karbanId: { type: new GraphQLNonNull(GraphQLID) },
        projectName: { type: new GraphQLNonNull(GraphQLString) },
        projectDescription: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args) {
        const karban = await Karban.findOne({
          _id: args.karbanId,
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

        karbanProject.tabs.push(tab._id);
        await karbanProject.save();

        return tab;
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
