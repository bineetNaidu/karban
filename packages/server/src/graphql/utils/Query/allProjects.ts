import Project from '../../../models/Project';

export const allProjects = async () => {
  const projects = await Project.find({}).populate('tabs').exec();
  return projects;
};
