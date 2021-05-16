import User from '../../../models/User';

export const allUsers = async () => {
  const users = await User.find({}).populate('projects').exec();
  return users;
};
