import mongoose from 'mongoose';
import Tab from './Tab';
import { StringAndRequired } from './utils';

interface ProjectDoc extends mongoose.Document {
  projectName: string;
  projectDescription?: string;
  tabs: string[];
}

interface ProjectModel extends mongoose.Model<ProjectDoc> {
  build(data: { projectName: string; projectDescription?: string }): ProjectDoc;
}

const ProjectSchema = new mongoose.Schema<ProjectDoc, ProjectModel>({
  projectName: StringAndRequired,
  projectDescription: String,
  tabs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tab',
    },
  ],
});

ProjectSchema.pre('remove', async function () {
  await Tab.remove({
    _id: {
      $in: this.tabs,
    },
  });
});

ProjectSchema.statics.build = (data: {
  projectName: string;
  projectDescription?: string;
}) => {
  return new Project(data);
};

const Project = mongoose.model<ProjectDoc, ProjectModel>(
  'Project',
  ProjectSchema
);

export default Project;
