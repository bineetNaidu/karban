import User, { UserDoc } from '../../../models/User';

// @ts-ignore
export const allUsers: Promise<UserDoc[]> = async () => {
  const users = await User.find({}).populate('projects').exec();
  return users;
};
