export interface Karban {
  _id: string;
  username: string;
  passcode: string;
  projects: KarbanProjects[];
}

export interface KarbanProjects {
  projectId: string;
  projectName: string;
  projectDescription: string;
  tabs: KarbanProjectTab[];
}
export interface KarbanProjectTab {
  tabId: string;
  tabName: string;
  cards: KarbanProjectTabCard[];
}

export interface KarbanProjectTabCard {
  cardId: string;
  cardBody: string;
}
