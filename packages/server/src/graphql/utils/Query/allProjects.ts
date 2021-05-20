import Project, { ProjectDoc } from '../../../models/Project';

// @ts-ignore
export const allProjects: Promise<ProjectDoc[]> = async () => {
  const projects = await Project.find({}).populate('tabs').exec();
  return projects;
};
