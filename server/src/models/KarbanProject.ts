import mongoose from 'mongoose';
import KarbanProjectTab from './KarbanProjectTab';
import { StringAndRequired } from './utils';

interface KarbanProjectDoc extends mongoose.Document {
  projectName: string;
  projectDescription?: string;
  tabs: string[];
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'KarbanProjectTab',
    },
  ],
});

KarbanProjectSchema.pre('remove', async function () {
  await KarbanProjectTab.remove({
    tabId: {
      $in: this.tabs,
    },
  });
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
