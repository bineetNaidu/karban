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
        const karbanProject = await KarbanProject.findOne({ _id: parent._id });
        if (!karbanProject) {
          throw new GraphQLError('Karban Project Not Found');
        }
        const cards = karbanProject.tabs.map((t) => t.cards);
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
        const karbanProject = await KarbanProject.findOne({ _id: parent._id });
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
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
