import create from 'zustand';
import { Card, Project, Tab } from '../generated/graphql';

interface IProjectStateModel {
  tabs: any[];
  _id?: string;
  projectDescription?: string;
  projectName?: string;
  setProject: (payload: Project) => void;
  addTab: (payload: Tab) => void;
  deleteTab: (id: string) => void;
  reset: () => void;
  setCard: (tabId: string, data: Card[]) => void;
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
  setCard: (tabId, data) =>
    set((state) => {
      return {
        tabs: state.tabs.map((t) => {
          if (t._id === tabId) {
            t.cards.push({
              _id: 'dsa',
              __typename: 'Card',
              cardBody: 'bineet',
            });

            return t;
          }
          return t;
        }),
      };
    }),
}));
