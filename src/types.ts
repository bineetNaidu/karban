export interface Karban {
  _id: string;
  username: string;
  passcode: string;
  projects: KarbanProjects[];
}

export type KarbanProjects = {
  projectId: string;
  projectName: string;
  projectDescription: string;
  tabs: KarbanProjectTab[];
};
export type KarbanProjectTab = {
  tabId: string;
  tabName: string;
  cards: KarbanProjectTabCard[];
};

export type KarbanProjectTabCard = {
  cardId: string;
  cardBody: string;
};
