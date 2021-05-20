import Project, { ProjectDoc } from '../../../models/Project';

// @ts-ignore
export const getProjectById: Promise<ProjectDoc> = async (
  parent: any,
  args: { id: string }
) => {
  const project = await Project.findOne({ _id: args.id });
  if (!project) {
    throw new Error('No Project was found with the given ID!');
  }
  return project;
};
