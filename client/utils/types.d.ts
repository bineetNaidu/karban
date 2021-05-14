export type User = {
  _id: string;
  email: string;
  username: string;
  avatar?: string;
};

export type Tab = {
  _id: string;
  tabId: string;
  tabName: string;
  cards: {
    cardId;
    cardBody;
  }[];
};

export type Project = {
  _id: string;
  projectName: string;
  projectDescription: string;
  tabs: Tab[];
};

export interface StateContextType {
  user: User | null;
  projects: Project[] | string[] | null;
}

export type ActionTypes =
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_PROJECTS'; payload: Project[] | string[] }
  | { type: 'SET_PROJECT'; payload: Project }
  | { type: 'ADD_CARD'; payload: { cardId: string; cardBody: string } }
  | { type: 'ADD_TAB'; payload: Tab };
