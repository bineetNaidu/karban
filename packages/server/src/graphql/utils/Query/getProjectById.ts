import Project from '../../../models/Project';

export const getProjectById = async (parent: any, args: { id: string }) => {
  const project = await Project.findOne({ _id: args.id });
  return project;
};
