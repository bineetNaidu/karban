import mongoose from 'mongoose';
import { StringAndRequired, StringAndRequiredAndUnique } from './utils';

interface KarbanDoc extends mongoose.Document {
  username: string;
  avatar: string;
  email: string;
  password: string;
  projects: string[];
}

interface KarbanModel extends mongoose.Model<KarbanDoc> {
  build(data: {
    username: string;
    avatar: string;
    email: string;
    password: string;
  }): KarbanDoc;
}

const KarbanSchema = new mongoose.Schema<KarbanDoc, KarbanModel>(
  {
    username: StringAndRequiredAndUnique,
    avatar: {
      type: String,
      default: '',
    },
    email: {
      ...StringAndRequiredAndUnique,
      lowercase: true,
    },
    password: StringAndRequired,
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'KarbanProject',
      },
    ],
  },
  {
    versionKey: false,
  }
);

KarbanSchema.statics.build = (data: {
  username: string;
  avatar: string;
  email: string;
  password: string;
}) => {
  return new Karban(data);
};

const Karban = mongoose.model<KarbanDoc, KarbanModel>('Karban', KarbanSchema);

export default Karban;

Karban.build;
