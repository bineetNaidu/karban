import mongoose from 'mongoose';
import Card from './Card';
import { StringAndRequired } from './utils';

export interface ProjectDoc extends mongoose.Document {
  projectName: string;
  projectDescription?: string;
  cards: string[];
}

interface ProjectModel extends mongoose.Model<ProjectDoc> {
  build(data: { projectName: string; projectDescription?: string }): ProjectDoc;
}

const ProjectSchema = new mongoose.Schema<ProjectDoc, ProjectModel>({
  projectName: StringAndRequired,
  projectDescription: String,
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card',
    },
  ],
});

ProjectSchema.pre('remove', async function () {
  await Card.remove({
    _id: {
      $in: this.cards,
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
