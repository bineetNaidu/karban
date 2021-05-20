import { createProject } from './createProject';
import { updateProject } from './updateProject';
import { deleteProject } from './deleteProject';
import { createTab } from './createTab';
import { updateTab } from './updateTab';
import { deleteTab } from './deleteTab';

export const Mutation: any = {
  createProject,
  updateProject,
  deleteProject,
  createTab,
  updateTab,
  deleteTab,
};