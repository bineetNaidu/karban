import create from 'zustand';
import { Card } from '../generated/graphql';

interface IProjectStateModel {
  cards: Card[];
  reset: () => void;
  setCard: (data: Card[]) => void;
}

export const useProjectStore = create<IProjectStateModel>((set) => ({
  cards: [],
  reset: () =>
    set(() => ({
      cards: [],
    })),
  setCard: (data) => set(() => ({ cards: data })),
}));
