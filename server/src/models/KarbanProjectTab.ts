import mongoose from 'mongoose';
import { StringAndRequiredAndUnique, StringAndRequired } from './utils';

type Card = {
  cardId: string;
  cardBody?: string;
};

interface TabDoc extends mongoose.Document {
  tabId: string;
  tabName: string;
  cards: Card[];
}

interface TabModel extends mongoose.Model<TabDoc> {
  build(data: { tabId: string; tabName: string }): TabDoc;
  buildCard(
    tabId: string,
    data: {
      cardId: string;
      cardBody: string;
    }
  ): Card[];
}

const TabSchema = new mongoose.Schema<TabDoc, TabModel>({
  tabId: StringAndRequiredAndUnique,
  tabName: StringAndRequired,
  cards: [
    {
      _id: false,
      cardId: StringAndRequiredAndUnique,
      cardBody: String,
    },
  ],
});

TabSchema.statics.build = (data: { tabId: string; tabName: string }) => {
  return new KarbanProjectTab({
    ...data,
    cards: [],
  });
};

TabSchema.statics.buildCard = async function (
  tabId: string,
  data: {
    cardId: string;
    cardBody: string;
  }
) {
  const karbanProjectTab = await this.findById(tabId);
  if (!karbanProjectTab) {
    throw new Error('Tab Not Found');
  }

  karbanProjectTab.cards.push(data);
  await karbanProjectTab.save();

  return karbanProjectTab.cards;
};

const KarbanProjectTab = mongoose.model<TabDoc, TabModel>(
  'KarbanProjectTab',
  TabSchema
);

export default KarbanProjectTab;
