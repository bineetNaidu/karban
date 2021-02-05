import mongoose from 'mongoose';
import { StringAndRequired, StringAndRequiredAndUnique } from './utils';

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
