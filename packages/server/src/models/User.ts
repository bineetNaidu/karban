import mongoose from 'mongoose';
import { StringAndRequired, StringAndRequiredAndUnique } from './utils';
import Project from './Project';
import bcrypt from 'bcrypt';

export interface UserDoc extends mongoose.Document {
  username: string;
  avatar: string;
  password: string;
  projects: string[];
  comparePassword: (password: string) => Promise<boolean>;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(data: { username: string; avatar: string; password: string }): UserDoc;
}

const UserSchema = new mongoose.Schema<UserDoc, UserModel>(
  {
    username: StringAndRequiredAndUnique,
    password: StringAndRequired,
    avatar: {
      type: String,
      default: '',
    },
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

UserSchema.pre('save', async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 14);
  }
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.statics.build = (data: {
  username: string;
  avatar: string;
  password: string;
}) => {
  return new User(data);
};

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);

export default User;
