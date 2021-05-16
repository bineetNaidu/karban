import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { StringAndRequired, StringAndRequiredAndUnique } from './utils';
import Project from './Project';

interface UserDoc extends mongoose.Document {
  username: string;
  avatar: string;
  email: string;
  password: string;
  projects: string[];
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(data: {
    username: string;
    avatar: string;
    email: string;
    password: string;
  }): UserDoc;

  login(username: string, password: string): Promise<UserDoc>;
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
    password: StringAndRequired,
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

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.pre('remove', async function () {
  await Project.remove({
    _id: {
      $in: this.projects,
    },
  });
});

UserSchema.statics.login = async function (username: string, password: string) {
  const user = await this.findOne({ username });
  if (user) {
    let authUser = await bcrypt.compare(password, user.password);

    if (authUser) {
      return user;
    } else {
      throw new Error('Incorrect Password');
    }
  }
  throw new Error('Incorrect Username');
};

UserSchema.statics.build = (data: {
  username: string;
  avatar: string;
  email: string;
  password: string;
}) => {
  return new User(data);
};

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);

export default User;
