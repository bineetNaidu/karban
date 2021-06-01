import mongoose from 'mongoose';
import { StringAndRequired } from './utils';

type Card = {
  _id?: string;
  cardBody?: string;
};

export interface TabDoc extends mongoose.Document {
  tabName: string;
  cards: Card[];
}

interface TabModel extends mongoose.Model<TabDoc> {
  build(data: { tabName: string }): TabDoc;
  buildCard(data: { cardBody: string }): Card[];
}

const TabSchema = new mongoose.Schema<TabDoc, TabModel>({
  tabName: StringAndRequired,
  cards: [
    {
      cardBody: String,
    },
  ],
});

TabSchema.statics.build = (data: { tabName: string }) => {
  return new Tab({
    ...data,
    cards: [],
  });
};

TabSchema.statics.buildCard = async function (data: { cardBody: string }) {
  const Tab = await this.findOne({});
  if (!Tab) {
    throw new Error('Tab Not Found');
  }

  Tab.cards.push(data);
  await Tab.save();

  return Tab.cards;
};

const Tab = mongoose.model<TabDoc, TabModel>('Tab', TabSchema);

export default Tab;
