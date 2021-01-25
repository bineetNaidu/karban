import mongoose from 'mongoose';
import { KarbanDocs, KarbanModel } from './utils/types';
import { StringAndRequired, StringAndRequiredAndUnique } from './utils';

const KarbanSchema = new mongoose.Schema({
  username: StringAndRequiredAndUnique,
  passcode: StringAndRequired,
  projects: [
    {
      _id: false,
      projectId: StringAndRequiredAndUnique,
      projectName: StringAndRequired,
      projectDescription: String,
      tabs: [
        {
          _id: false,
          tabId: StringAndRequiredAndUnique,
          tabName: StringAndRequired,
          cards: [
            {
              _id: false,
              cardId: StringAndRequiredAndUnique,
              cardBody: String,
            },
          ],
        },
      ],
    },
  ],
});

//? To build a new Karban
KarbanSchema.statics.build = (passcode: string, username: string) => {
  return new Karban({ username, passcode, projects: [] });
};
//? To build a new Karban Project
KarbanSchema.statics.buildProject = async (
  _id: string,
  projectName: string,
  projectDescription: string
) => {
  const karban = await Karban.findOne({ _id });
  if (!karban) throw new Error('Karban Not Found');
  const projectId = mongoose.Types.ObjectId().toHexString();
  const data = {
    projectId,
    projectDescription: projectDescription || '',
    projectName,
    tabs: [],
  };
  karban.projects.push(data);
  return karban;
};
//? To build a new Karban Project Tab
KarbanSchema.statics.buildProjectTab = async (
  _id: string,
  projectId: string,
  tabName: string
) => {
  const karban = await Karban.findOne({ _id });
  if (!karban) throw new Error('Karban Not Found');
  const project = karban.projects.find((p) => p.projectId === projectId);
  if (!project) throw new Error('Karban Project Not Found');
  const tabId = mongoose.Types.ObjectId().toHexString();
  project.tabs.push({ tabId, tabName, cards: [] });
  return karban;
};

//? To build a new Karban Project tab Card
KarbanSchema.statics.buildProjectTabCard = async (
  _id: string,
  projectId: string,
  tabId: string,
  cardBody: string
) => {
  const karban = await Karban.findOne({ _id });
  if (!karban) throw new Error('Karban Not Found');
  const project = karban.projects.find((p) => p.projectId === projectId);
  if (!project) throw new Error('Karban Project Not Found');
  const tab = project.tabs.find((t) => t.tabId === tabId);
  if (!tab) throw new Error('Karban Project Tab Not Found');
  const cardId = mongoose.Types.ObjectId().toHexString();
  tab.cards.push({ cardBody: cardBody || '', cardId });
  return karban;
};

// TODO : Fix the typeof KarbanSchema of any !! < ((KarbanSchema as any)) >
const Karban = mongoose.model<KarbanDocs, KarbanModel>(
  'Karban',
  KarbanSchema as any
);

export default Karban;
