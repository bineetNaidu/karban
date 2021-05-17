import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { StringAndRequired, StringAndRequiredAndUnique } from './utils';
import Project from './Project';

interface UserDoc extends mongoose.Document {
  username: string;
  avatar: string;
  email: string;
  githubId: string;
  projects: string[];
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(data: {
    username: string;
    avatar: string;
    email: string;
    githubId: string;
  }): UserDoc;
}

const UserSchema = new mongoose.Schema<UserDoc, UserModel>(
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
    githubId: StringAndRequiredAndUnique,
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
  },
  {
    versionKey: false,
  }
);

UserSchema.pre('remove', async function () {
  await Project.remove({
    _id: {
      $in: this.projects,
    },
  });
});

UserSchema.statics.build = (data: {
  username: string;
  avatar: string;
  email: string;
  githubId: string;
}) => {
  return new User(data);
};

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);

export default User;
