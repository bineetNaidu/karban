import mongoose from 'mongoose';
import { StringAndRequired, StringAndRequiredAndUnique } from './utils';

type Card = {
  cardId: string;
  cardBody?: string;
};

type Tab = {
  tabId: string;
  tabName: string;
  cards: Card[];
};

interface KarbanProjectDoc extends mongoose.Document {
  projectName: string;
  projectDescription?: string;
  tabs: Tab[];
}

interface KarbanProjectModel extends mongoose.Model<KarbanProjectDoc> {
  build(data: {
    projectName: string;
    projectDescription?: string;
  }): KarbanProjectDoc;
}

const KarbanProjectSchema = new mongoose.Schema<
  KarbanProjectDoc,
  KarbanProjectModel
>({
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
});

KarbanProjectSchema.statics.build = (data: {
  projectName: string;
  projectDescription?: string;
}) => {
  return new KarbanProject(data);
};

const KarbanProject = mongoose.model<KarbanProjectDoc, KarbanProjectModel>(
  'KarbanProject',
  KarbanProjectSchema
);

export default KarbanProject;
