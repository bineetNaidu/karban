export type User = {
  _id: string;
  email: string;
  token: string;
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
  projects: Project[] | null;
}

export type ActionTypes =
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'ADD_CARD'; payload: { cardId: string; cardBody: string } }
  | { type: 'ADD_TAB'; payload: Tab };
