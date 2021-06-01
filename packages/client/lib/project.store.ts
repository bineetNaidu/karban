import create from 'zustand';
import { Project, Tab } from '../generated/graphql';

interface IProjectStateModel extends Project {
  setProject: (payload: Project) => void;
  addTab: (payload: Tab) => void;
  deleteTab: (id: string) => void;
  reset: () => void;
}

export const useProjectStore = create<IProjectStateModel>((set) => ({
  projectDescription: '',
  projectName: '',
  tabs: [],
  _id: '',
  setProject: (data) =>
    set(() => ({
      _id: data._id,
      projectDescription: data.projectDescription,
      projectName: data.projectName,
      tabs: data.tabs,
    })),
  addTab: (data) => set((state) => ({ tabs: [...state.tabs, data] })),
  deleteTab: (id) =>
    set((state) => ({
      tabs: state.tabs.filter((t) => t._id !== id),
    })),
  reset: () =>
    set(() => ({
      projectDescription: '',
      projectName: '',
      tabs: [],
      _id: '',
    })),
}));
