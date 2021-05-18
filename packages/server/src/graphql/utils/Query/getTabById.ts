import Tab, { TabDoc } from '../../../models/Tab';

// @ts-ignore
export const getTabById: Promise<TabDoc> = async (
  parent: any,
  args: { id: string }
) => {
  const tab = await Tab.findOne({ _id: args.id });
  return tab;
};
