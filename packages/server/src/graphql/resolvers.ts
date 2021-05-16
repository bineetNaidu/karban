import Project from '../models/Project';
import Tab from '../models/Tab';
import User from '../models/User';

export const resolvers = {
  Query: {
    allProjects: async () => {
      const projects = await Project.find({}).populate('tabs').exec();
      return projects;
    },

    allUsers: async () => {
      const users = await User.find({}).populate('projects').exec();
      return users;
    },

    getProjectById: async (parent: any, args: { id: string }) => {
      const project = await Project.findOne({ _id: args.id });
      return project;
    },

    getTabById: async (parent: any, args: { id: string }) => {
      const tab = await Tab.findOne({ _id: args.id });
      return tab;
    },
  },
};
