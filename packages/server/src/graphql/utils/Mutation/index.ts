import { createProject } from './createProject';
import { updateProject } from './updateProject';
import { deleteProject } from './deleteProject';
import { createCard } from './createCard';
import { updateCard } from './updateCard';
import { deleteCard } from './deleteCard';
import { register } from './register';
import { login } from './login';
import { logout } from './logout';

export const Mutation = {
  createProject,
  updateProject,
  deleteProject,
  createCard,
  updateCard,
  deleteCard,
  register,
  login,
  logout,
};
