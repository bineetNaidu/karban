import Project, { ProjectDoc } from '../../../models/Project';

// @ts-ignore
export const getProjectById: Promise<ProjectDoc | null> = async (
  _parent: any,
  args: { id: string }
) => {
  const project = await Project.findOne({ _id: args.id });
  if (!project) {
    return null;
  }
  return project;
};
