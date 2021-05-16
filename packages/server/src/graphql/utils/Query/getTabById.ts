import Tab from '../../../models/Tab';

export const getTabById = async (parent: any, args: { id: string }) => {
  const tab = await Tab.findOne({ _id: args.id });
  return tab;
};
