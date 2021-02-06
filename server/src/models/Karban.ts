import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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

  login(username: string, password: string): KarbanDoc;
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

KarbanSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

KarbanSchema.statics.login = async function (
  username: string,
  password: string
) {
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
