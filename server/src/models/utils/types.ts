import mongoose from 'mongoose';

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

//? An interface that describe the properties
//? that a Karban Document has
export interface KarbanDocs extends mongoose.Document {
  username: string;
  passcode: string;
  projects: KarbanProjects[];
}

//? An interface that  desc the props
//? that a Karban model has!
export interface KarbanModel extends mongoose.Model<KarbanDocs> {
  build(passcode: string, username: string): KarbanDocs;
  buildProject(
    _id: string,
    projectName: string,
    projectDescription: string
  ): Promise<KarbanDocs>;
  buildProjectTab(
    _id: string,
    projectId: string,
    tabName: string
  ): Promise<KarbanDocs>;
  buildProjectTabCard(
    _id: string,
    projectId: string,
    tabId: string,
    cardBody: string
  ): Promise<KarbanDocs>;
}
